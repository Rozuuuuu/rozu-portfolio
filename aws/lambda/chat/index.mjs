/**
 * AWS Lambda — POST /api/chat
 *
 * Transport wrapper around Gemini for the "Lloyd AI" assistant.
 *
 * The system prompt is NOT written by hand here. `aws/build.mjs` imports it
 * from api/chat.js (which generates it from projectsData / achievementsData /
 * blogData) and writes it out as chat-prompt.mjs beside this file. So the
 * Lambda always ships the same knowledge base as the site — no second copy to
 * drift out of sync.
 *
 * Runtime: nodejs22.x
 * Dependency: @google/generative-ai
 * Env var: GEMINI_API_KEY
 * API Gateway: HTTP API, payload format 2.0
 *
 * No CORS headers: /api/* is served through the same CloudFront distribution
 * as the site, so requests are same-origin.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    SYSTEM_INSTRUCTION,
    MAX_MESSAGE_LENGTH,
    MAX_HISTORY_ITEMS,
} from './chat-prompt.mjs';

const json = (statusCode, body) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const handler = async (event) => {
    const method = event?.requestContext?.http?.method ?? event?.httpMethod;
    if (method && method !== 'POST') {
        return json(405, { error: 'Method not allowed. Use POST.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY is not configured.');
        return json(500, { error: 'Server configuration error.' });
    }

    try {
        const raw = event?.isBase64Encoded
            ? Buffer.from(event.body ?? '', 'base64').toString('utf8')
            : event?.body ?? '';
        const { message, history = [] } = raw ? JSON.parse(raw) : {};

        if (!message || typeof message !== 'string' || !message.trim()) {
            return json(400, { error: 'Message is required.' });
        }

        const cleanMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);
        const safeHistory = Array.isArray(history) ? history.slice(-MAX_HISTORY_ITEMS) : [];

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        const formattedHistory = safeHistory
            .filter((m) => typeof m?.role === 'string' && typeof m?.text === 'string')
            .map((m) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text.slice(0, MAX_MESSAGE_LENGTH) }],
            }));

        // Gemini requires history to begin with a 'user' turn; the UI seeds the
        // conversation with a model greeting, so drop any leading model turns.
        while (formattedHistory.length > 0 && formattedHistory[0].role !== 'user') {
            formattedHistory.shift();
        }

        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(cleanMessage);

        return json(200, { reply: result.response.text() });
    } catch (error) {
        console.error('Gemini API Error:', error?.message || error);
        return json(500, {
            error: 'Synthesis failed. The AI twin is temporarily unavailable.',
        });
    }
};
