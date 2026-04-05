import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, PawPrint } from 'lucide-react';
import { aiApi } from '../services/api';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', text: 'Xin chào! Tôi là Pawsie 🐾 Tôi có thể giúp gì cho bạn hôm nay?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await aiApi.post('/api/ai/chat', { message: userMsg.text });
            setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: res.data.response }]);
        } catch {
            setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: 'Xin lỗi, tôi đang gặp sự cố. Hãy thử lại! 🐾' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 max-h-[500px] flex flex-col rounded-3xl shadow-2xl bg-white border-2 border-cream overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <PawPrint className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-fredoka font-bold text-white text-lg leading-none">Pawsie</p>
                                <p className="text-white/70 text-xs font-semibold">Your pet grooming assistant</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[340px] bg-gray-50">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-semibold leading-relaxed whitespace-pre-wrap ${msg.from === 'user'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-cream'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-cream rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-3 bg-white border-t border-cream flex gap-2">
                        <input
                            className="flex-1 border-2 border-cream rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:border-primary transition-colors"
                            placeholder="Ask about your pet..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 transition-all"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all"
                aria-label="Open chat"
            >
                {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
            </button>
        </>
    );
};

export default ChatWidget;
