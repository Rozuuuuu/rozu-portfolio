/**
 * Shared contribution-fetching logic.
 *
 * Used by BOTH the Vercel serverless function (api/contributions.js) and the
 * Vite dev middleware (vite.config.js), so `npm run dev` and production behave
 * identically. Files in /api starting with "_" are ignored by Vercel's router,
 * so this never becomes a public endpoint.
 *
 * Returns a transport-agnostic { status, body } pair — the caller writes it to
 * whatever response object it has.
 */

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions({ token, username }) {
    if (!token || !username) {
        return {
            status: 500,
            body: { error: 'Server not configured: GITHUB_TOKEN and GITHUB_USERNAME must be set.' },
        };
    }

    try {
        const ghRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': `${username}-portfolio`,
            },
            body: JSON.stringify({
                query: CONTRIBUTIONS_QUERY,
                variables: { login: username },
            }),
        });

        const json = await ghRes.json();

        // Surface the real GitHub error rather than a generic fallback.
        if (json.errors && json.errors.length) {
            return { status: 502, body: { error: json.errors[0].message } };
        }

        const calendar =
            json?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            return {
                status: 404,
                body: { error: `No contribution data found for user "${username}".` },
            };
        }

        const days = calendar.weeks.flatMap((week) =>
            week.contributionDays.map((day) => ({
                date: day.date,
                contributionCount: day.contributionCount,
            }))
        );

        return { status: 200, body: { total: calendar.totalContributions, days } };
    } catch (err) {
        return { status: 500, body: { error: err?.message || 'Failed to fetch contributions.' } };
    }
}
