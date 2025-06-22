import React from "react";
import { Upload, Download, Bell, BarChart, Mic, MessageCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t.landingPage.features.documentAnalysis.title,
      description: t.landingPage.features.documentAnalysis.description,
      icons: [Upload, Download],
      badge: "OCR",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      backInfo: t.landingPage.capabilities.ocr.description
    },
    {
      title: t.landingPage.capabilities.chat.realTime.title, 
      description: t.landingPage.capabilities.chat.realTime.description,
      icons: [Bell],
      badge: "Real-time",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      backInfo: t.landingPage.capabilities.chat.description
    },
    {
      title: t.landingPage.features.voice.title,
      description: t.landingPage.features.voice.description,
      icons: [Mic],
      badge: t.landingPage.capabilities.tabs.voice, 
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      backInfo: t.landingPage.capabilities.voice.description
    },
    {
      title: t.landingPage.features.search.title,
      description: t.landingPage.features.search.description,
      icons: [BarChart, MessageCircle],
      badge: t.landingPage.capabilities.tabs.search,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      backInfo: t.landingPage.capabilities.search.description
    },
    {
      title: t.landingPage.features.search.alerts.title,
      description: t.landingPage.features.search.alerts.description,
      icons: [AlertCircle],
      badge: "Alerts",
      image: "https://images.unsplash.com/photo-1555448248-2571daf6344b",
      backInfo: t.landingPage.features.search.alerts.description
    }
  ];

  return (
    <section id="features" className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(rgba(58, 161, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 161, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#3AA1FF] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0A1F44] mb-8 animate-fade-in">
            {t.landingPage.features.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-300">
            {t.landingPage.hero.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative h-96 animate-fade-in"
              style={{ 
                animationDelay: `${index * 200}ms`,
                perspective: '1000px'
              }}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700 group-hover:scale-105 group-hover:rotate-y-12"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden group-hover:shadow-[0_0_40px_rgba(58,161,255,0.3)]">
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#3AA1FF] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                        {feature.badge}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      {feature.icons.map((Icon, iconIndex) => (
                        <Icon key={iconIndex} className="w-6 h-6 text-[#3AA1FF] group-hover:scale-125 transition-transform duration-300" />
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0A1F44] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Back info shown on hover */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#3AA1FF] to-[#0A1F44] rounded-3xl shadow-xl p-6 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icons.length > 0 && React.createElement(feature.icons[0], { className: "w-8 h-8" })}
                    </div>
                    <p className="text-lg font-medium leading-relaxed">
                      {feature.backInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-[#E6F1FF]">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default FeaturesSection;
