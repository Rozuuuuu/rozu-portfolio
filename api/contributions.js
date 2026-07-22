/**
 * Vercel Serverless Function: /api/contributions
 *
 * Thin transport wrapper around the shared fetchContributions() logic. The
 * GitHub token is read from an environment variable server-side and NEVER
 * exposed to the client.
 *
 * Required environment variables:
 *   GITHUB_TOKEN     — a classic/fine-grained PAT with read access
 *                      (read:user is enough for public contribution data)
 *   GITHUB_USERNAME  — the GitHub login whose calendar to read
 *
 * Response shape:
 *   { total: number, days: [{ date: "YYYY-MM-DD", contributionCount: number }] }
 *
 * Caching: Cache-Control s-maxage=86400 keeps this off GitHub's rate limit by
 * serving one shared CDN copy per day regardless of visitor count.
 */

import { fetchContributions } from './_contributions-core.js';

export default async function handler(req, res) {
    // One shared CDN copy per day; revalidate in the background afterwards.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed. Use GET.' });
    }

    const { status, body } = await fetchContributions({
        token: process.env.GITHUB_TOKEN,
        username: process.env.GITHUB_USERNAME,
    });

    return res.status(status).json(body);
}
