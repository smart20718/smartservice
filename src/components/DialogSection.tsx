import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const DialogSection = () => {
  const { t } = useLanguage();
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [typingIndex, setTypingIndex] = useState(-1);

  const dialogs = [
    {
      user: t.landingPage.demo.demoMessages.user1,
      ai: t.landingPage.demo.demoMessages.assistant1,
      hasVoice: true
    },
    {
      user: t.landingPage.demo.demoMessages.user2,
      ai: t.landingPage.demo.demoMessages.assistant2,
      hasVoice: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev < dialogs.length * 2) {
          // Start typing animation for AI responses
          if (prev % 2 === 1) {
            setTypingIndex(Math.floor(prev / 2));
            setTimeout(() => setTypingIndex(-1), 2000);
          }
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ai-demo" className="py-32 bg-[#E6F1FF] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0A1F44] mb-8">
            {t.landingPage.demo.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.landingPage.features.conversations.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {dialogs.map((dialog, index) => (
            <div key={index} className="space-y-8">
              {/* User message */}
              {visibleMessages > index * 2 && (
                <div className="flex justify-end animate-fade-in">
                  <div className="bg-[#3AA1FF] text-white rounded-3xl rounded-br-md px-8 py-6 max-w-md shadow-xl relative">
                    {dialog.hasVoice && (
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className="w-1 bg-white/70 rounded-full animate-pulse"
                              style={{ 
                                height: `${Math.random() * 20 + 10}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm text-white/80 ml-2">{t.landingPage.capabilities.voice.title}</span>
                      </div>
                    )}
                    <p className="font-medium text-lg">{dialog.user}</p>
                  </div>
                </div>
              )}

              {/* AI response */}
              {visibleMessages > index * 2 + 1 && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl rounded-bl-md px-8 py-6 max-w-lg shadow-xl border border-white/20 relative overflow-hidden">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3AA1FF]/5 via-transparent to-[#3AA1FF]/5 animate-pulse"></div>
                    
                    <div className="flex items-center space-x-3 mb-4 relative z-10">
                      <div className="w-3 h-3 bg-[#3AA1FF] rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-[#0A1F44]">Smart Service</span>
                      {typingIndex === index && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-[#3AA1FF] rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-[#3AA1FF] rounded-full animate-bounce delay-100"></div>
                          <div className="w-1 h-1 bg-[#3AA1FF] rounded-full animate-bounce delay-200"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 whitespace-pre-line relative z-10 leading-relaxed">{dialog.ai}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Zigzag divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0 L60,60 L120,0 L180,60 L240,0 L300,60 L360,0 L420,60 L480,0 L540,60 L600,0 L660,60 L720,0 L780,60 L840,0 L900,60 L960,0 L1020,60 L1080,0 L1140,60 L1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default DialogSection;
