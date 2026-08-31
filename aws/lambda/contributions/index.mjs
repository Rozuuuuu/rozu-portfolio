/**
 * AWS Lambda — GET /api/contributions
 *
 * Transport wrapper around the SAME fetchContributions() logic the Vercel
 * function uses. `aws/build.mjs` copies _contributions-core.js in beside this
 * file, so there is exactly one implementation of the GitHub query.
 *
 * Runtime: nodejs22.x  (native fetch — no npm dependencies at all)
 * Env vars: GITHUB_TOKEN, GITHUB_USERNAME
 * API Gateway: HTTP API, payload format 2.0
 */
import { fetchContributions } from './_contributions-core.js';

export const handler = async () => {
    const { status, body } = await fetchContributions({
        token: process.env.GITHUB_TOKEN,
        username: process.env.GITHUB_USERNAME,
    });

    return {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json',
            // CloudFront honours s-maxage: one shared copy per day keeps this
            // well clear of GitHub's rate limit no matter how many visitors.
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
        body: JSON.stringify(body),
    };
};
