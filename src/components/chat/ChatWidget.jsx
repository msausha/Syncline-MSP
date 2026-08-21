import React, { useReducer, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { MessageCircle, X, Zap, Calendar, Phone, Clock, Shield, User, MapPin, MessageSquare } from "lucide-react";

import { chatReducer, initialState } from "./chatReducer";
import chatKnowledge from "./data/chatKnowledge.json";

const quickOptions = [
  { icon: Zap, text: "IT Support Pricing", value: "pricing" },
  { icon: Calendar, text: "Book Free Assessment", value: "assessment" },
  { icon: Phone, text: "Emergency Support", value: "emergency" },
  { icon: Clock, text: "Response Times", value: "response" },
  { icon: Shield, text: "Cybersecurity Solutions", value: "security" },
  { icon: User, text: "About Syncline IT", value: "about" },
  { icon: MessageSquare, text: "Custom IT Solutions", value: "custom" },
];

const ChatWidget = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { messages, showNamePrompt, userName, showContactPrompt, userEmailOrPhone, isTyping } = state;
  const [isOpen, setIsOpen] = useState(false); // control widget open/close
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleAddMessage = (type, text, delay = 0) => {
    dispatch({ type: "SET_TYPING", payload: type === "bot" });
    setTimeout(() => {
      dispatch({ type: type === "bot" ? "BOT_MESSAGE" : "USER_MESSAGE", payload: text });
      dispatch({ type: "SET_TYPING", payload: false });
    }, delay);
  };

  const handleQuickOption = (value) => {
    const option = quickOptions.find((o) => o.value === value);
    if (!option) return;
    handleAddMessage("user", option.text);
    const response = chatKnowledge[value] || chatKnowledge.fallback;
    handleAddMessage("bot", response, 1200);
  };

  // Validate Australian phone number
  const isValidPhone = (phone) => {
    const regex = /^(?:\+?61|0)[2-478]\d{8}$/;
    return regex.test(phone.replace(/\s+/g, ""));
  };

  // Validate email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      dispatch({ type: "SET_USER_NAME", payload: userName.trim() });
      handleAddMessage("bot", `Nice to meet you, ${userName}! Can I have your email or Australian phone number for follow-up?`, 800);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!userEmailOrPhone.trim()) return;

    if (!isValidEmail(userEmailOrPhone.trim()) && !isValidPhone(userEmailOrPhone.trim())) {
      handleAddMessage("bot", "Please enter a valid email or Australian phone number.", 500);
      return;
    }

    dispatch({ type: "SET_USER_CONTACT", payload: userEmailOrPhone.trim() });
    handleAddMessage("bot", "Great! How can I help you today?", 800);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="fixed bottom-5 right-5 z-[10000]">
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={handleToggle}
          aria-label="Open chat support"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 w-[350px] sm:w-[400px] max-h-[75vh] bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Syncline IT Support chat"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-cyan-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                <div>
                  <h3 className="text-white font-semibold">Syncline IT Support</h3>
                  <p className="text-xs text-white/80">Online · Instant replies</p>
                </div>
              </div>
              <button onClick={handleClose} aria-label="Close chat">
                <X className="w-5 h-5 text-white hover:text-white/80" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.type === "user"
                        ? "bg-gradient-to-br from-blue-600/90 to-cyan-600/90 text-white"
                        : "bg-slate-800/85 text-slate-100"
                    }`}
                  >
                    {msg.text}
                    <span className="block text-[0.68rem] opacity-70 mt-1 text-right">{msg.timestamp}</span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Options */}
            {!showNamePrompt && !showContactPrompt && (
              <div className="p-3 border-t border-white/10 bg-slate-900/70 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickOptions.map((opt, idx) => (
                  <button
                    key={`${opt.value}-${idx}`}
                    onClick={() => handleQuickOption(opt.value)}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-xs bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 text-slate-200 hover:text-white transition-colors"
                  >
                    <opt.icon className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    {opt.text}
                  </button>
                ))}
              </div>
            )}

            {/* Name Prompt */}
            {showNamePrompt && (
              <div className="p-4 bg-slate-800/70 border-t border-white/10">
                <form onSubmit={handleNameSubmit} className="space-y-3">
                  <label htmlFor="chat-name" className="sr-only">Your name</label>
                  <input
                    id="chat-name"
                    type="text"
                    value={userName}
                    onChange={(e) => dispatch({ type: "SET_USER_NAME_INPUT", payload: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-slate-800/70 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">Next</button>
                </form>
              </div>
            )}

            {/* Email/Phone Prompt */}
            {showContactPrompt && (
              <div className="p-4 bg-slate-800/70 border-t border-white/10">
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <label htmlFor="chat-contact" className="sr-only">Email or phone number</label>
                  <input
                    id="chat-contact"
                    type="text"
                    value={userEmailOrPhone}
                    onChange={(e) => dispatch({ type: "SET_USER_CONTACT_INPUT", payload: e.target.value })}
                    placeholder="Enter your email or contact number..."
                    className="w-full px-4 py-3 bg-slate-800/70 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">Start Chat</button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;