import { useState, useRef, useEffect, useCallback } from 'react';

const INITIAL_GREETING = {
    id: 'greeting-1',
    role: 'model',
    text: "Hey — I'm Lloyd's digital twin. Ask me anything about my projects, tech stack, or engineering philosophy.",
};

/**
 * useChat — Custom hook for managing the ChatWithLloyd conversation.
 *
 * Returns:
 *  - messages:       Array of { id, role: 'user'|'model', text }
 *  - sendMessage:    (text: string) => void — Optimistic UI append + API call
 *  - isLoading:      boolean — true while awaiting the AI response
 *  - messagesEndRef: React ref to attach to the scroll anchor element
 */
export function useChat() {
    const [messages, setMessages] = useState([INITIAL_GREETING]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the newest message whenever the list updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = useCallback(
        async (text) => {
            const trimmed = text?.trim();
            if (!trimmed || isLoading) return;

            const userMsg = {
                id: `user-${Date.now()}`,
                role: 'user',
                text: trimmed,
            };

            // Pattern 1 — Optimistic UI: append the user message immediately
            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);

            try {
                // Build history from all prior messages (exclude the new one — it's sent as `message`)
                const history = messages.map((m) => ({
                    role: m.role,
                    text: m.text,
                }));

                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: trimmed, history }),
                });

                if (!res.ok) {
                    throw new Error(`API returned ${res.status}`);
                }

                const data = await res.json();

                const modelMsg = {
                    id: `model-${Date.now()}`,
                    role: 'model',
                    text: data.reply,
                };

                setMessages((prev) => [...prev, modelMsg]);
            } catch (err) {
                console.error('useChat error:', err);

                // Pattern 2 — Resilience: graceful fallback message
                const errorMsg = {
                    id: `error-${Date.now()}`,
                    role: 'model',
                    text: 'System Parity Error — my digital twin is momentarily offline. Please try again in a few seconds.',
                };

                setMessages((prev) => [...prev, errorMsg]);
            } finally {
                setIsLoading(false);
            }
        },
        [messages, isLoading],
    );

    return { messages, sendMessage, isLoading, messagesEndRef };
}
