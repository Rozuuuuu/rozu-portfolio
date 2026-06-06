import { useState } from 'react';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useChat } from '../hooks/useChat';

const ChatSidebar = ({ isOpen, onClose }) => {
    const { messages, sendMessage, isLoading, messagesEndRef } = useChat();
    const [inputValue, setInputValue] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        const text = inputValue;
        setInputValue('');
        await sendMessage(text);
    };

    const renderMessageText = (text) => {
        if (!text) return '';
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }

            const linkText = match[1];
            const linkUrl = match[2];

            if (linkUrl.startsWith('/') && !linkUrl.startsWith('//')) {
                parts.push(
                    <Link
                        key={match.index}
                        to={linkUrl}
                        onClick={onClose}
                        className="font-bold underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-black dark:hover:decoration-white transition-all text-black dark:text-white"
                    >
                        {linkText}
                    </Link>
                );
            } else {
                parts.push(
                    <a
                        key={match.index}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-black dark:hover:decoration-white transition-all text-black dark:text-white"
                    >
                        {linkText}
                    </a>
                );
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Sidebar */}
                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] z-[9999] bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center gap-3">
                                {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                <img
                                    src="/lloyd-pic.png"
                                    alt="Lloyd"
                                    className="w-8 h-8 rounded-full object-cover"
                                    width="48"
                                    height="48"
                                    decoding="async"
                                    loading="lazy"
                                />
                                <div>
                                    <h2 className="font-headline text-lg font-black text-black dark:text-white tracking-tighter leading-none mb-1">ChatWithLloyd</h2>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse"></div>
                                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close chat"
                                className="w-10 h-10 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 font-mono">
                            {messages.map(msg => {
                                const isBot = msg.role === 'model';
                                return (
                                    <div key={msg.id} className={`flex flex-col max-w-[85%] ${isBot ? 'self-start' : 'self-end'}`}>
                                        <div 
                                            className={`p-3 text-sm border ${
                                                isBot 
                                                ? 'bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white border-neutral-200 dark:border-neutral-800 rounded-2xl rounded-tl-sm' 
                                                : 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white rounded-2xl rounded-tr-sm'
                                            }`}
                                        >
                                            {renderMessageText(msg.text)}
                                        </div>
                                        <span className={`text-[10px] text-neutral-400 mt-1 uppercase tracking-widest ${isBot ? 'text-left ml-1' : 'text-right mr-1'}`}>
                                            {isBot ? 'Lloyd AI' : 'You'}
                                        </span>
                                    </div>
                                );
                            })}
                            
                            {/* Loading Skeleton */}
                            {isLoading && (
                                <div className="flex flex-col max-w-[85%] self-start">
                                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-neutral-400 animate-skeleton"></div>
                                        <div className="w-2 h-2 rounded-full bg-neutral-400 animate-skeleton" style={{ animationDelay: '200ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-neutral-400 animate-skeleton" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                    <span className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest text-left ml-1">
                                        Lloyd AI
                                    </span>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 md:p-6 border-t border-neutral-200 dark:border-neutral-800">
                            <form onSubmit={handleSend} className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Message Lloyd AI..."
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full pl-4 pr-12 py-3 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-sm">send</span>
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Powered by Lloyd AI</span>
                            </div>
                        </div>
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ChatSidebar;
