import React, { useEffect, useRef } from 'react';

const ChatModule = ({
    messages,
    inputValue,
    setInputValue,
    handleSend,
    isModularMode,
    activeDragElement,
    position,
    width = 672,
    height,
    onMouseDown
}) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;

    return (
        <div
            id="chat"
            onMouseDown={onMouseDown}
            className="flex flex-col items-center w-full"
            style={{ pointerEvents: 'auto' }}
        >
            {/* Transcript Text */}
            {latestMessage && (
                <div className="text-center mb-4 px-4 max-w-md animate-fade-in">
                    <p className="text-sm" style={{ color: 'var(--accent-cyan)', opacity: 0.85 }}>
                        {latestMessage.text?.length > 80
                            ? latestMessage.text.substring(0, 80) + '....'
                            : latestMessage.text}
                    </p>
                </div>
            )}

            {/* Hidden scrollable message history */}
            <div className="hidden">
                {messages.slice(-5).map((msg, i) => (
                    <div key={i}>
                        <span>{msg.sender}</span>
                        <div>{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <div className="w-full max-w-lg px-4">
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleSend}
                        placeholder="Type your command..."
                        className="w-full px-5 py-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all"
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                            e.target.style.boxShadow = '0 0 0 2px rgba(0, 229, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border-subtle)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatModule;
