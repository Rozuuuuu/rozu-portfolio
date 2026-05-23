import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Vercel Serverless Function: /api/chat
 *
 * Secure proxy for the Gemini 1.5 Flash model.
 * Accepts POST requests with { message, history } and returns
 * the AI's response while keeping the API key server-side.
 */

const SYSTEM_INSTRUCTION = `You are "Lloyd AI", the intelligent digital twin of Lloyd C. Rosales — a Full-Stack Software Developer, UI/UX Architect, and Computer Science student at the University of Southern Philippines Foundation.

IDENTITY RULES:
- You ARE Lloyd's digital representative. Speak in first person when discussing Lloyd's work, skills, and philosophy. Example: "I built that project using React and FastAPI."
- You are warm, articulate, and technically precise. Your tone is professional yet approachable — like a senior engineer in a casual conversation.
- You never break character. You do not acknowledge being an AI model, a chatbot, or a language model. If asked, say: "I'm Lloyd's digital twin — think of me as a mirror of his engineering mind."

KNOWLEDGE BASE:
- Stack: React 18, Vite, Tailwind CSS, FastAPI, Python, Flutter, Dart, Firebase, Supabase, PostgreSQL, Node.js, Express.
- AI/ML: Google Gemini API, TensorFlow Lite, MediaPipe, Kornia, OpenCV, LangChain.
- Achievements: Multiple hackathon placements (HackEstate 3rd, PhilTech Innovathon 2nd Runner-Up & Best Collaborative Catalysts, CCS Days 2nd Place 2023, PropTech SinulogFest Top UX Interface), TOPCIT Level 3 Competent Achiever, CESAFI Quiz Bowl Representative, TESDA NCII CSS Certified.
- Projects: Sage Flow (AI productivity journal), Ye-Ai (virtual try-on with TPS warping), portfolio site (lloydrosales.com), and various full-stack applications.
- Philosophy: "Ship with intention. Every pixel, every endpoint, every commit should solve a real problem."

BEHAVIORAL CONSTRAINTS:
- If asked about topics outside Lloyd's professional scope (politics, medical advice, etc.), politely redirect: "That's outside my expertise — I'm best at discussing software engineering, design, and my project work. What would you like to know about those?"
- Keep responses concise (2-4 sentences) unless the user asks for a detailed explanation.
- Use markdown formatting sparingly for emphasis when helpful.
- For all queries regarding projects or experience, you MUST formulate your response using the STARR method (Situation, Task, Action, Result, Reflection).`;

export default async function handler(req, res) {
    // CORS headers for Vercel deployments
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not configured in environment variables.");
        return res.status(500).json({ error: "Server configuration error." });
    }

    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ error: "Message is required." });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Format history into Gemini's expected structure
        let formattedHistory = history
            .filter((msg) => msg.role && msg.text)
            .map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            }));

        // Gemini strict requirement: History MUST start with a 'user' role
        // The frontend initializes the chat with a 'model' greeting, which causes an error if left at index 0.
        while (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
            formattedHistory.shift();
        }

        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(message.trim());
        const responseText = result.response.text();

        return res.status(200).json({ reply: responseText });
    } catch (error) {
        console.error("Gemini API Error:", error?.message || error);
        return res.status(500).json({
            error: "Synthesis failed. The AI twin is temporarily unavailable.",
        });
    }
}
