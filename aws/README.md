# AWS deployment — S3 + CloudFront + Lambda + API Gateway

A parallel deployment of the portfolio on AWS, for learning the services and as
a documented DevOps project. **`lloydrosales.com` stays on Vercel** — this ships
to `aws.lloydrosales.com` so the live, indexed site is never at risk.

```
                    aws.lloydrosales.com
                            │
                    ┌───────▼────────┐
                    │   CloudFront   │  ACM cert (us-east-1)
                    └───┬────────┬───┘
             default ───┘        └─── /api/*
                    │                    │
              ┌─────▼─────┐      ┌───────▼────────┐
              │ S3 (priv) │      │ API Gateway    │
              │  via OAC  │      │   (HTTP API)   │
              └───────────┘      └───┬────────┬───┘
           403/404 → /index.html     │        │
              (SPA deep links)   ┌───▼──┐ ┌───▼─────────┐
                                 │ chat │ │contributions│
                                 └──────┘ └─────────────┘
```

---

## 0. Prerequisites

- An AWS account (free tier covers most of this for 12 months).
- Nothing installed locally is required for the console walkthrough — but
  install the **AWS CLI** anyway, it makes step 2 one command instead of drag-and-drop.
- Decide your region (e.g. `ap-southeast-1` Singapore, closest to Cebu).
  **Exception: the ACM certificate MUST be in `us-east-1`** — see step 6.

## 1. Build everything locally

```bash
npm run build        # → dist/          the React site
node aws/build.mjs   # → aws/build/     the two Lambda packages
cd aws/build/chat && npm install --omit=dev && cd ../../..
```

`aws/build.mjs` snapshots the chatbot's system prompt from `api/chat.js` (which
generates it from `projectsData` / `achievementsData` / `blogData`), so the
Lambda ships the same knowledge base as the site. **Re-run it whenever you add a
project or blog post.**

## 2. S3 bucket (private — CloudFront reaches it via OAC)

1. **S3 → Create bucket**, name e.g. `lloydrosales-aws-site`, your region.
2. Leave **Block all public access = ON**. The bucket stays private; CloudFront
   is granted access in step 5. (Public buckets are the classic S3 mistake.)
3. Do **not** enable "Static website hosting" — that mode requires a public
   bucket and only speaks HTTP. You want the REST endpoint + OAC instead.
4. Upload the contents of `dist/`:
   ```bash
   aws s3 sync dist/ s3://lloydrosales-aws-site --delete
   ```

## 3. Lambda functions

Create **two** functions, runtime **Node.js 22.x**, architecture `arm64`
(cheaper), each with `index.handler` as the handler.

| Function | Upload | Env vars | Timeout |
|---|---|---|---|
| `lloyd-chat` | zip of `aws/build/chat/` contents | `GEMINI_API_KEY` | 30s |
| `lloyd-contributions` | zip of `aws/build/contributions/` contents | `GITHUB_TOKEN`, `GITHUB_USERNAME` | 10s |

> **Zip the folder's *contents*, not the folder.** `index.mjs` must sit at the
> root of the zip or Lambda cannot find the handler. On Windows: select the
> files inside the folder → Send to → Compressed folder.

Chat needs 30s because Gemini can take several seconds; the default 3s will
time out. Set env vars under **Configuration → Environment variables**.

## 4. API Gateway (HTTP API)

1. **API Gateway → Create API → HTTP API**.
2. Add two routes, each with its Lambda integration:
   - `POST /api/chat` → `lloyd-chat`
   - `GET /api/contributions` → `lloyd-contributions`
3. Keep the default `$default` stage with **auto-deploy** on.
4. **Do not configure CORS** — CloudFront serves the API under the same origin
   as the site, so there is no cross-origin request to allow.
5. Copy the **Invoke URL** (e.g. `https://abc123.execute-api.<region>.amazonaws.com`).

Test it directly before moving on:

```bash
curl -X POST https://abc123.execute-api.<region>.amazonaws.com/api/chat \
  -H "Content-Type: application/json" -d '{"message":"hello","history":[]}'
```

## 5. CloudFront distribution

**Origins** — add two:

| Origin | Settings |
|---|---|
| S3 bucket | Origin access: **Origin access control (OAC)** → create one → then click **Copy policy** and paste it into the bucket's permissions (S3 → your bucket → Permissions → Bucket policy). This is what lets CloudFront read a private bucket. |
| API Gateway | Add the invoke URL **without** the `https://` scheme and without a path. Protocol: HTTPS only. |

**Behaviors** — order matters, most specific first:

| # | Path pattern | Origin | Key settings |
|---|---|---|---|
| 1 | `/api/chat` | API GW | Methods: **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE** · Cache policy `CachingDisabled` · Origin request policy `AllViewerExceptHostHeader` |
| 2 | `/api/contributions` | API GW | Methods: GET, HEAD · Cache policy `UseOriginCacheControlHeaders` · Origin request policy `AllViewerExceptHostHeader` |
| 3 | `Default (*)` | S3 | Viewer protocol policy: **Redirect HTTP to HTTPS** · Cache policy `CachingOptimized` |

Two things people get wrong here:

- **POST is blocked unless you allow all methods** on the `/api/chat` behavior.
  The default GET/HEAD-only setting makes the chatbot fail with 403.
- **`AllViewerExceptHostHeader` is required** for API Gateway. Forwarding the
  viewer's `Host` header makes API Gateway reject the request.

Behavior 2 uses `UseOriginCacheControlHeaders` so the `s-maxage=86400` the
Lambda already returns is honoured — that keeps one shared copy per day and
stops you burning GitHub's API rate limit.

**Default root object:** `index.html`

**Custom error responses** — this is the SPA fix, add both:

| HTTP error code | Response page path | HTTP response code |
|---|---|---|
| 403 | `/index.html` | **200** |
| 404 | `/index.html` | **200** |

Without these, `aws.lloydrosales.com/projects/sugboway` returns S3's 403 on a
hard refresh, because no such key exists in the bucket. Returning **200** (not
403) matters — a 200 lets React Router take over and keeps search engines from
seeing every deep link as an error.

## 6. Certificate + custom domain

1. Switch the console region to **N. Virginia (us-east-1)** — CloudFront only
   reads certificates from that region, no matter where the rest of your stack
   lives. This is the single most common stumbling block.
2. **ACM → Request a public certificate** for `aws.lloydrosales.com`, DNS validation.
3. ACM gives you a CNAME record to prove ownership. Add it in **Vercel → Domains
   → lloydrosales.com → DNS Records**, wait for status **Issued**.
4. Back in CloudFront → your distribution → **Settings → Edit**:
   - Alternate domain name (CNAME): `aws.lloydrosales.com`
   - Custom SSL certificate: the ACM cert you just issued.

## 7. DNS

In Vercel's DNS for `lloydrosales.com`, add:

| Type | Name | Value |
|---|---|---|
| CNAME | `aws` | `d1234abcd.cloudfront.net` (your distribution domain) |

Keeping DNS at Vercel avoids paying for a Route 53 hosted zone. If you'd rather
practise Route 53, move the whole zone there instead — don't split it.

## 8. Verify

```bash
curl -I  https://aws.lloydrosales.com/                     # 200
curl -I  https://aws.lloydrosales.com/projects/sugboway    # 200  ← SPA routing
curl -I  http://aws.lloydrosales.com/                      # 301/308 → https
curl -s  https://aws.lloydrosales.com/api/contributions | head -c 120
curl -sX POST https://aws.lloydrosales.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"what projects have you built?","history":[]}' | head -c 300
```

Then in a browser: hard-refresh a deep link, open the chatbot, and check the
contribution graph renders.

## 9. Cost & teardown

Low-traffic cost is a few dollars a month at most; the free tier covers much of
it for the first 12 months. CloudFront and Lambda are effectively free at
portfolio traffic — S3 storage and request counts dominate, and both are pennies.

To tear down cleanly: **disable** the CloudFront distribution first, wait for it
to finish, then delete it → then the API, Lambdas, bucket, and certificate.

## 10. What's deliberately different from Vercel

| Vercel | Here | Why |
|---|---|---|
| `vercel.json` rewrite | CloudFront custom error responses | S3 has no SPA fallback |
| `res.setHeader(...)` caching | CloudFront cache policies | CDN owns caching |
| CORS headers in `chat.js` | none | same-origin via one distribution |
| `@vercel/analytics` | not deployed | swap for CloudFront logs / Plausible / GA4 |
| git push → deploy | manual (for now) | see below |

**Next step once this works by hand:** turn on the CI pipeline below, then port
the whole stack to Terraform. Doing it in the console first means you'll
actually understand what the IaC is describing.

---

# 11. CI/CD — `.github/workflows/deploy-aws.yml`

Once the manual deploy works, this workflow does steps 1–2 (and the Lambda
uploads and cache invalidation) on every push to `master`. It uses **OIDC**, so
there are **no AWS access keys stored in GitHub** — the job requests a
short-lived credential at runtime. This is the current best practice and worth
doing properly; long-lived keys in CI are one of the most common ways cloud
accounts get compromised.

## 11a. Create the OIDC identity provider (once per AWS account)

**IAM → Identity providers → Add provider → OpenID Connect**

| Field | Value |
|---|---|
| Provider URL | `https://token.actions.githubusercontent.com` |
| Audience | `sts.amazonaws.com` |

## 11b. Create the role GitHub will assume

**IAM → Roles → Create role → Web identity**, pick the provider above, then
edit its **trust policy** to this (replace `<ACCOUNT_ID>`):

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
      },
      "StringLike": {
        "token.actions.githubusercontent.com:sub": "repo:Rozuuuuu/rozu-portfolio:*"
      }
    }
  }]
}
```

The `sub` condition is the security boundary — it means **only this repository**
can assume the role. Leave it off and any GitHub repo on the internet could.

Attach this **permissions policy** (least privilege — replace the placeholders):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SyncSite",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::<BUCKET>"
    },
    {
      "Sid": "WriteObjects",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::<BUCKET>/*"
    },
    {
      "Sid": "UpdateLambdas",
      "Effect": "Allow",
      "Action": [
        "lambda:UpdateFunctionCode",
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration"
      ],
      "Resource": [
        "arn:aws:lambda:<REGION>:<ACCOUNT_ID>:function:lloyd-chat",
        "arn:aws:lambda:<REGION>:<ACCOUNT_ID>:function:lloyd-contributions"
      ]
    },
    {
      "Sid": "BustCache",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
      "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
    }
  ]
}
```

`GetFunctionConfiguration` and `GetInvalidation` are needed by the `aws ... wait`
commands in the workflow — without them the deploy fails at the wait step.

## 11c. Add the GitHub secrets

**Repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret | Example |
|---|---|
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/github-actions-portfolio` |
| `AWS_REGION` | `ap-southeast-1` |
| `S3_BUCKET` | `lloydrosales-aws-site` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1A2B3C4D5E6F7` |

`GEMINI_API_KEY`, `GITHUB_TOKEN` and `GITHUB_USERNAME` are **not** needed here —
they live on the Lambda functions themselves, and the pipeline only replaces
code, never configuration.

## 11d. What the pipeline does

1. `pnpm install --frozen-lockfile` → build the site and both Lambda packages.
2. `npm install` **inside the chat Lambda folder** — deliberately npm, not pnpm.
   pnpm creates a *symlinked* `node_modules`, and symlinks don't survive zipping;
   the function would fail at runtime with `Cannot find module '@google/generative-ai'`.
3. Zip each folder's **contents** so `index.mjs` lands at the zip root.
4. Assume the AWS role via OIDC.
5. `s3 sync` in two passes — hashed assets get `max-age=31536000,immutable`,
   while `index.html` gets `no-cache` (otherwise visitors keep loading the old app).
6. Update both Lambdas and **wait** for each to finish, so a bad deploy fails the
   build instead of passing silently.
7. Invalidate CloudFront and wait for completion.
8. **Smoke test** — homepage, a SPA deep link (asserts `200`, catching the
   403/404 misconfiguration), and a live call to `/api/chat`.

Run it by hand the first time from **Actions → Deploy to AWS → Run workflow**.

> This pipeline only touches the AWS stack. Vercel keeps deploying
> `lloydrosales.com` from the same branch independently, so if this workflow
> fails your production site is unaffected.

---

# 12. Terraform — `aws/terraform/`

The same stack as steps 2–7, as code. Build it in the console first; then this
file set will read as a description of something you already understand rather
than magic.

| File | Contains |
|---|---|
| `main.tf` | Providers (incl. the `us-east-1` alias for ACM) and the managed CloudFront policy lookups |
| `storage.tf` | Private S3 bucket, OAC, and the bucket policy scoped to one distribution |
| `compute.tf` | Both Lambdas, their IAM role, log groups, API Gateway routes |
| `cdn.tf` | ACM certificate and the CloudFront distribution (behaviors + SPA error responses) |
| `variables.tf` / `outputs.tf` | Inputs and the values you'll need afterwards |

## Usage

```bash
# 1. Package the Lambdas first — Terraform zips whatever is in aws/build/
npm run build
node aws/build.mjs
(cd aws/build/chat && npm install --omit=dev)

# 2. Configure
cd aws/terraform
cp terraform.tfvars.example terraform.tfvars   # then fill it in

# 3. Apply
terraform init
terraform plan      # always read the plan before applying
terraform apply
```

## Two-phase domain setup

Leave `domain_name = ""` on the **first** apply. You get a working stack on the
default `*.cloudfront.net` domain with no certificate involved — much easier to
debug. Then:

1. Set `domain_name = "aws.lloydrosales.com"` in `terraform.tfvars`.
2. `terraform apply`. It will **pause** at `aws_acm_certificate_validation`.
3. Run `terraform output acm_validation`, add those CNAME records in Vercel's DNS.
4. Terraform picks up the validation and finishes on its own.
5. Add the final `CNAME aws → <cloudfront_domain>` record.

## Notes

- **Secrets:** `terraform.tfvars` and `*.tfstate` are gitignored — state files
  contain your API keys in plaintext. If you ever move this to a team setting,
  use an S3 backend with encryption rather than local state.
- **Deliberately not managed here:** the OIDC provider and CI role from §11.
  Those grant deploy access, and it's healthier to keep the thing that hands out
  permissions separate from the thing being deployed.
- **Reusing an existing console-built stack?** Either `terraform import` each
  resource, or tear the console version down first — otherwise you'll get
  name-collision errors on `apply`.
