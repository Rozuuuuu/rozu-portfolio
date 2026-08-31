// Blog posts for the About → Blog tab and the /blog/:slug article pages.
// Newest first (the UI also sorts by date). Each entry supports:
//   slug        — URL segment; the article lives at /blog/<slug>
//   title       — catchy, descriptive headline
//   date        — ISO 'YYYY-MM-DD' (shown as "Mar 15, 2026")
//   readingTime — e.g. '6 min read'
//   category    — badge label, e.g. 'Case Study', 'Tutorial', 'Deep Dive'
//   excerpt     — 1–2 sentence hook (shown on the card)
//   takeaways   — 2–3 bullets of what the reader will learn (optional, card)
//   tags        — ['React', 'NodeJS'] (rendered as #React)
//   content     — the full article body in Markdown (rendered at /blog/<slug>)
//   live, repo  — optional associated project links
//
// To publish a post, add an object here. To host a full article on your own
// domain, give it a `slug` and `content`. (An external `url` is also supported
// for posts hosted on dev.to/Medium — set url instead of slug/content.)
//
// The two entries below are starter case-study DRAFTS built from your real
// projects — review and rewrite them in your own voice before sharing widely.

export const blogPosts = [
    {
        slug: 'porting-my-portfolio-to-aws',
        title: 'Porting This Site to AWS — and Why I’m Not Migrating It',
        date: '2026-08-31',
        readingTime: '7 min read',
        category: 'Build Log',
        excerpt:
            'A running log of rebuilding this portfolio on S3 + CloudFront + Lambda + API Gateway — as a second deployment, not a replacement. The architecture, the tradeoffs, and the three details that decide whether it works.',
        takeaways: [
            'Why the AWS version ships to a subdomain instead of replacing production.',
            'What Vercel gives you for free that you rebuild by hand on AWS.',
            'The SPA routing detail on S3 that quietly breaks deep links and SEO.',
        ],
        tags: ['AWS', 'CloudFront', 'Lambda', 'Terraform', 'DevOps'],
        content: `**Status: in progress.** The code is written and tested locally; the infrastructure isn't deployed yet. I'll update this post as I go, including whatever breaks.

I'm working through a 6-day AWS DevOps roadmap, and the most useful exercise I could think of was rebuilding something I already understand completely: this site.

## The decision I made first: not migrating

The obvious move is "move the portfolio to AWS." I decided against it.

This site runs on Vercel, and for a React SPA with two serverless functions, Vercel is genuinely the better product — git-push deploys, preview URLs, automatic certificates, zero cost at my traffic. Moving to AWS means more configuration, a small monthly bill, and features I'd have to rebuild by hand. As *hosting*, it's a downgrade.

But as *learning*, it's excellent. So the AWS version deploys to a subdomain and runs alongside production. Same code, two architectures.

There's a practical reason too. I've put real work into this domain being indexed — sitemap, structured data, Search Console. A botched migration with broken deep links would undo that, and "I wanted to practise Terraform" is a bad reason to risk it.

## The architecture

\`\`\`
                       CloudFront
                    ┌──────┴───────┐
              default            /api/*
                 │                  │
            S3 (private)      API Gateway
             via OAC          ┌─────┴─────┐
        403/404 → index.html  │           │
                            chat   contributions
\`\`\`

One CloudFront distribution fronts everything: the static build from a private S3 bucket, and the two functions behind API Gateway. Three decisions inside that shape did most of the work.

## 1. S3 has no idea what a SPA is

Request \`/projects/sugboway\` from S3 and you get a 403, because no such object exists. Every route in this site is client-side, so on a hard refresh, every single one breaks.

The fix is CloudFront custom error responses mapping **403 and 404** to \`/index.html\` — returning status **200**, not the original error code. Both parts matter. You need 403 as well as 404 because a private S3 bucket returns "forbidden" rather than "not found" for a missing key. And you need the 200 because if crawlers see a 403 on every deep link, you've quietly told Google your whole site is broken.

On Vercel this is a single rewrite rule I wrote once and forgot about. That's the tradeoff in one example.

## 2. Same-origin means deleting code

Serving \`/api/*\` through the same distribution as the site makes API calls same-origin. So the CORS handling in my chat function — the allow-list, the preflight branch, the \`Vary: Origin\` header — is simply gone in the Lambda version.

Not simplified. Deleted. The nicest kind of refactor.

## 3. The knowledge base can't be copied

My chatbot answers questions about my projects, which means it needs a system prompt describing them. I'd already learned the hard way that a hand-maintained list drifts from reality — so the prompt is generated from the same data files the site renders.

Deploying to a second platform threatened to reintroduce exactly that problem: a second copy, drifting separately.

So the Lambda doesn't keep its own copy. The build step imports the prompt from the existing function and writes it out as a frozen snapshot into the deployment package. One source of truth, two runtimes. If I add a project, both get it on the next build.

## What Vercel does that you rebuild

| Vercel | AWS |
|---|---|
| \`vercel.json\` rewrite | CloudFront custom error responses |
| Cache headers on the response | CloudFront cache policies |
| CORS config | not needed |
| git push → deploy | GitHub Actions + OIDC role |
| Automatic HTTPS | ACM cert (us-east-1 only) |

That last one deserves a warning: CloudFront only reads certificates from **us-east-1**, regardless of where the rest of your stack lives. Deploy everything to Singapore, request the cert in Singapore, and CloudFront simply won't see it.

## Where it stands

The Lambda handlers are ported and tested locally against realistic API Gateway events — method routing, body parsing, base64 decoding, error paths. The Terraform is written. The CI pipeline uses OIDC, so no AWS keys are stored in GitHub.

What's left is the part that actually teaches you something: applying it and finding out what I got wrong.

I'll update this post with the answer.`,
    },
    {
        slug: 'learning-aws-devops-roadmap',
        title: 'Learning AWS DevOps: Working Through a 6-Day Roadmap',
        date: '2026-08-17',
        readingTime: '3 min read',
        category: 'Learning Journal',
        excerpt:
            "I'm working through NextWork's 6-day AWS DevOps roadmap to sharpen my CI/CD and cloud skills. Here's what the first two days covered — and what I'm taking from it.",
        takeaways: [
            'Day 1 — wiring VS Code to AWS for a real cloud dev environment.',
            'Day 2 — source control with GitHub as the backbone of a DevOps workflow.',
            'Why hands-on labs beat passive tutorials for retaining cloud concepts.',
        ],
        tags: ['AWS', 'DevOps', 'CI/CD', 'Learning'],
        content: `Great engineers keep learning, so I'm spending some post-graduation time going deep on cloud and DevOps. Right now I'm working through **NextWork's 6-day AWS DevOps roadmap** — a hands-on track that builds a real CI/CD workflow on AWS, one day at a time. Here's where I am.

## Day 1 — A real cloud dev environment

The first day was about wiring **VS Code to AWS** so the editor talks directly to cloud services. Setting up the environment properly up front is the unglamorous work that makes everything after it faster.

[Read the Day 1 write-up →](https://nextwork.ai/eager_pink_proud_kiwano/docs/aws-devops-vscode)

## Day 2 — Source control as the backbone

Day 2 moved into **GitHub** — not just committing code, but treating source control as the backbone of a DevOps pipeline. Every automation that comes later hangs off getting this right.

[Read the Day 2 write-up →](https://nextwork.ai/eager_pink_proud_kiwano/docs/aws-devops-github)

## What's next

Four more days to go — heading into pipelines and automation. I'll update this post as I finish each one.

> **2 of 6 days done.** The full project, with every module link, lives on my [projects page](/projects/aws-devops-roadmap).`,
    },
    {
        slug: 'aria-consent-gated-lead-capture',
        title: 'Keeping PII Out of the Model: Aria’s Consent-Gated Lead Capture',
        date: '2026-03-15',
        readingTime: '6 min read',
        category: 'Case Study',
        excerpt:
            'How I built an AI property assistant where the visitor’s contact details never enter the language model’s context — enforced independently at the button, the API, and the database.',
        takeaways: [
            'Why contact details go straight to Postgres instead of through the model (RA 10173 compliance).',
            'Grounding a Gemini chat engine with pgvector RAG so answers stay tied to real listings.',
            'A Postgres outbox + retry worker so a provider outage costs a retry, not a lead.',
        ],
        tags: ['Next.js', 'AI', 'pgvector', 'Data Privacy'],
        live: 'https://aria-property-assistant.vercel.app',
        content: `The brief was simple: a chat assistant that answers questions about property listings in Cebu and captures leads for agents. The hard part was everything the brief didn't say — mostly, **how do you collect someone's contact details without ever handing them to a language model?**

Aria is a Next.js 15 app on Neon Postgres. Here are the decisions I'm proudest of.

## The problem with letting the model collect PII

The obvious build is to let the chatbot ask for a name and number and "remember" them. But under the Data Privacy Act (RA 10173), personal data deserves a tighter blast radius than an LLM prompt that gets logged, cached, and sent to a third-party provider.

So I inverted it: **the model never sees contact details.** When a visitor consents to be contacted, their details post straight to Postgres.

## Consent-gated capture, enforced three times

One check is a suggestion; three checks are a guarantee. The consent path is enforced independently at:

- the **button** (the UI won't submit without explicit consent),
- the **API route** (server-side validation, never trusting the client), and
- a **CHECK constraint** in the database (the last line of defense).

If any layer is bypassed, the next one still holds.

## Grounding answers with pgvector RAG

Rather than stuffing the whole catalog into the prompt, listings are embedded and retrieved with **pgvector**. The model answers from real inventory, tool-calling for specifics, with output guardrails and a per-session turn budget so a conversation can't run away.

## Delivering leads reliably: a Postgres outbox

Sending the lead email inline means a provider outage loses a customer. Instead, each lead lands in a **Postgres outbox** and a claim-and-drain worker delivers it via Resend. An outage costs a retry, not a lead.

## Testing an LLM you can't mock

A mocked LLM can't fail an injection-resistance test. The eval harness scores **real** model replies and reports provider fallbacks as unscored, so the numbers mean something.

## By the numbers

- **178** unit tests
- **15** eval cases
- **3** languages (English, Tagalog, Cebuano)
- **0** PII tokens in the prompt

The takeaway I keep coming back to: privacy isn't a feature you add at the end — it's an architecture you choose at the start.`,
    },
    {
        slug: 'sugboway-postgis-routing',
        title: 'Routing Jeepneys with PostGIS: Why I Skipped a Hosted Maps API',
        date: '2026-01-20',
        readingTime: '5 min read',
        category: 'Case Study',
        excerpt:
            'Multi-leg fares and LTFRB rules don’t fit a generic routing API. Here’s how I modeled Metro Cebu’s public transport as a graph — with offline maps for spotty mobile data.',
        takeaways: [
            'Modeling multi-leg jeepney/bus fares as a custom Dijkstra graph over PostGIS.',
            'Shipping offline PMTiles maps so the app works on weak connections.',
            'Fencing an LLM transit guide so it stays grounded to real routes.',
        ],
        tags: ['Go', 'PostGIS', 'Gemini', 'Maps'],
        live: 'https://sugboway-web.onrender.com',
        content: `SugboWay answers one question for Metro Cebu commuters: *"where do I ride, how much, and how long?"* It sounds like a job for a hosted routing API. It wasn't.

## Why a generic routing API didn't fit

Multi-leg jeepney and bus journeys, LTFRB fare rules, and local transfers are graph problems a generic API can't model. So the engine is **Go + PostGIS** running a custom Dijkstra over the route graph, with fare and congestion logic built in.

## Offline maps for real-world connections

Cebu commuters often navigate on spotty mobile data. Live map tiles fail exactly when you need them. SugboWay ships **offline PMTiles** with MapLibre, so the map keeps working on a weak connection.

## A transit guide that can't hallucinate

An open LLM prompt will happily invent a route. The AI transit guide (Python/LangChain/Gemini) runs behind a **Cebu contextual fence** so its answers stay grounded to real routes — plus proximity-based "Lugar lang" etiquette cues.

## The shape of it

Three services — a Go/PostGIS routing engine, a grounded AI guide, and a Next.js/MapLibre front end — kept at **99.9% uptime**.

The lesson: reach for the platform that matches the domain. When the domain is messy local transit, that platform is a graph you control, not an API you rent.`,
    },
];
