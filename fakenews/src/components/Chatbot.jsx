import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const predefinedQuestions = [
  {
    id: '1',
    text: 'How do I verify if news is real or fake?',
    action: 'VERIFY_NEWS',
    icon: '🔍'
  },
  {
    id: '2',
    text: 'What are common signs of fake news?',
    action: 'FAKE_NEWS_SIGNS',
    icon: '⚠️'
  },
  {
    id: '3',
    text: 'How does TruthGuard detect fake news?',
    action: 'DETECTION_METHOD',
    icon: '🤖'
  },
  {
    id: '4',
    text: 'How to spot clickbait headlines?',
    action: 'CLICKBAIT_DETECTION',
    icon: '🎯'
  },
  {
    id: '5',
    text: 'Do you have any query about news?',
    action: 'NEWS_QUERY',
    icon: '📰'
  },
  {
    id: '6',
    text: 'Do you want to verify or summarize any news?',
    action: 'VERIFY_SUMMARIZE',
    icon: '📊'
  },
];

const getResponseForAction = (action) => {
  switch (action) {
    case 'NEWS_QUERY':
      return "I'm here to help with all your news-related questions! I can assist you with:\n\n" +
             "🔍 **Latest updates** on specific topics\n" +
             "📈 **Trending news** stories and analysis\n" +
             "✅ **Fact-checking** specific claims\n" +
             "🏛️ **Finding reliable** news sources\n" +
             "📊 **Understanding credibility** scores\n\n" +
             "What would you like to know about?";
    
    case 'VERIFY_SUMMARIZE':
      return "I'd be happy to help you verify and analyze news content! Here's what I can do:\n\n" +
             "🔗 **URL Analysis**: Paste any news URL for instant verification\n" +
             "📝 **Text Analysis**: Copy and paste article content directly\n" +
             "📊 **Credibility Scoring**: Get detailed reliability percentages\n" +
             "🎯 **Fact-checking**: Verify specific claims against reliable sources\n" +
             "📋 **Summarization**: Extract key points and main arguments\n\n" +
             "Simply go to the **Verify News** page and paste your content!";
    
    case 'VERIFY_NEWS':
      return `Here's your complete guide to news verification:\n\n` +
             `🔍 **Use our AI analysis tool** - Paste URLs or text on the Verify page\n` +
             `📚 **Check multiple sources** - Cross-reference with 2-3 reliable outlets\n` +
             `🏛️ **Verify the original source** - Look for primary sources and citations\n` +
             `📅 **Check publication dates** - Ensure information is current and relevant\n` +
             `👨‍💼 **Author credentials** - Research the writer's background and expertise\n` +
             `🔗 **Source links** - Verify that external links lead to credible sources\n\n` +
             `**Pro tip**: Our AI gives you a credibility score from 0-100% with detailed explanations!`;
    
    case 'FAKE_NEWS_SIGNS':
      return `🚨 **Red flags to watch for in potentially fake news:**\n\n` +
             `📰 **Headlines**: Sensational, emotional, or clickbait language\n` +
             `✍️ **Writing quality**: Poor grammar, spelling errors, or unprofessional tone\n` +
             `📚 **Sources**: Lack of credible citations or anonymous sources only\n` +
             `📸 **Images**: Outdated, manipulated, or unrelated photos\n` +
             `🔗 **Website URLs**: Suspicious domains that mimic legitimate news sites\n` +
             `📅 **Dates**: Outdated information presented as current news\n` +
             `💭 **Bias**: Extreme political bias or agenda-driven content\n` +
             `👥 **Author**: No author listed or unverifiable credentials\n\n` +
             `**Remember**: Always verify with multiple trusted sources!`;
    
    case 'DETECTION_METHOD':
      return `🤖 **TruthGuard's AI-powered detection system:**\n\n` +
             `🧠 **Natural Language Processing**: Analyzes writing patterns and language use\n` +
             `📊 **Source credibility analysis**: Checks domain reputation and authority\n` +
             `🔍 **Fact-checking database**: Cross-references claims with verified information\n` +
             `📝 **Content structure analysis**: Evaluates journalistic standards and formatting\n` +
             `🎯 **Bias detection**: Identifies emotional manipulation and agenda-driven content\n` +
             `⚡ **Real-time verification**: Instant analysis using Google's Gemini AI\n` +
             `📈 **Credibility scoring**: Comprehensive 0-100% reliability rating\n\n` +
             `Our AI processes thousands of data points to give you accurate, reliable results!`;
    
    case 'CLICKBAIT_DETECTION':
      return `🎯 **How to identify clickbait headlines:**\n\n` +
             `❗ **Excessive punctuation**: Multiple exclamation marks or question marks\n` +
             `😱 **Sensational words**: "SHOCKING!", "You won't believe...", "BREAKING!"\n` +
             `🔢 **Number lists**: "7 secrets...", "10 things...", "This one trick..."\n` +
             `😮 **Emotional manipulation**: Designed to trigger strong reactions\n` +
             `❓ **Incomplete information**: Vague promises without specific details\n` +
             `🖼️ **Misleading thumbnails**: Images that don't match the actual content\n` +
             `⏰ **Urgency tactics**: "Before it's too late!", "Limited time!"\n\n` +
             `**Our AI specifically looks for these patterns** and flags them in the analysis!`;
    
    default:
      return "I'm here to help you navigate the world of news verification! 🛡️\n\n" +
             "Feel free to ask me anything about:\n" +
             "• Verifying news authenticity\n" +
             "• Understanding credibility scores\n" +
             "• Identifying fake news patterns\n" +
             "• Using TruthGuard's features\n\n" +
             "What would you like to know?";
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const timeOfDay = 
      hour >= 5 && hour < 12 ? 'morning' :
      hour >= 12 && hour < 17 ? 'afternoon' :
      'evening';
    
    const greetingEmoji = 
      timeOfDay === 'morning' ? '🌅' :
      timeOfDay === 'afternoon' ? '☀️' :
      '🌙';
    
    return {
      content: `Good ${timeOfDay}! ${greetingEmoji}\n\nWelcome to **TruthGuard AI Assistant**! I'm here to help you navigate the world of news verification and fact-checking.\n\n🛡️ **I can help you with:**\n• Verifying news authenticity\n• Understanding our AI analysis\n• Spotting fake news patterns\n• Using platform features\n\nHow can I assist you today?`,
      options: predefinedQuestions,
    };
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getGreeting();
      setMessages([
        {
          id: '1',
          content: greeting.content,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          options: greeting.options,
        },
      ]);
    }
  }, [isOpen]);

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    simulateTyping(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your question! Let me help you with that.\n\n" + getResponseForAction(''),
        role: 'assistant',
        timestamp: new Date().toISOString(),
        options: predefinedQuestions,
      };
      setMessages((prev) => [...prev, response]);
    });
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      id: Date.now().toString(),
      content: option.text,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    simulateTyping(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: getResponseForAction(option.action),
        role: 'assistant',
        timestamp: new Date().toISOString(),
        options: predefinedQuestions,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 z-50"
          >
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 w-96 bg-white shadow-2xl rounded-tl-3xl border border-gray-200 z-50 max-h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-tl-3xl flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-bold flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    TruthGuard AI
                  </div>
                  <div className="text-xs text-purple-200">News Verification Assistant</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-96">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                            : 'bg-white text-gray-800 shadow-md border border-gray-200'
                        }`}
                      >
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: formatMessage(msg.content) 
                          }} 
                        />
                      </div>
                    </div>
                    
                    {msg.options && msg.role === 'assistant' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 space-y-2"
                      >
                        {msg.options.map((option) => (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left p-3 rounded-xl bg-white hover:bg-purple-50 transition-all duration-200 text-sm text-gray-700 border border-gray-200 hover:border-purple-300 flex items-center"
                          >
                            <span className="mr-3 text-lg">{option.icon}</span>
                            <span className="font-medium">{option.text}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-bl-3xl">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about news verification..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <HelpCircle className="h-3 w-3 mr-1" />
                <span>Powered by TruthGuard AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;