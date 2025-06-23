import { Play, ChevronDown, Sparkles, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/inputs/button";
import { useState, useEffect } from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [theme, setTheme] = useState('dark');

  // Create an array of mini titles for the typewriter effect
  const miniTitles = t.landingPage.hero.typewriter.map((sentence: string) => {
    return sentence.split(" ").map((word: string, idx: number) => {
      // Highlight first word and words containing 'IA' or 'AI'
      let cls = "text-white";
      if (idx === 0) cls = "text-[#3AA1FF]";
      if (word.toLowerCase().includes("ia") || word.toLowerCase().includes("ai")) {
        cls = "text-[#8E33FF]";
      }
      return { text: word, className: cls };
    });
  });

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Rotate through the titles every 4 seconds
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % miniTitles.length);
    }, 4000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative py-16 overflow-hidden bg-black sm:pb-20 lg:pb-24 xl:pb-32"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <svg className="blur-3xl filter opacity-70 animate-pulse-glow" style={{ filter: 'blur(64px)' }} width="444" height="536" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" fill="url(#c)" />
          <defs>
            <linearGradient id="c" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3AA1FF" />
              <stop offset="100%" stopColor="#8E33FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-black bg-[radial-gradient(#3AA1FF_1px,transparent_1px)] [background-size:32px_32px] opacity-20"
          style={{ backgroundPosition: "0 0" }}
        ></div>
        <img className="object-cover w-full h-full opacity-20" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png" alt="" />
      </div>
      
      {/* Main content */}
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/Smart_service_logo.png" alt="Logo Icon" className="w-8 h-8 animate-float" />
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF]"></div>
            </div>
            
            <h1 className="font-tech text-5xl font-bold text-white sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
              {t.landingPage.hero.title.split(' ')[0]} <span className="text-cyber font-bold relative">
                {t.landingPage.hero.title.split(' ').slice(1).join(' ')}
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-left"></span>
              </span>
            </h1>
            
            {/* Typewriter effect for changing mini titles */}
            <div className="mt-4 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px]">
              <TypewriterEffectSmooth 
                key={currentTitleIndex}
                words={miniTitles[currentTitleIndex]} 
                className="text-center lg:text-left" 
                cursorClassName="bg-[#3AA1FF]"
              />
            </div>
            
            <div className="mt-12 sm:mt-14 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 rounded-lg bg-gradient-to-r from-[#3AA1FF]/20 to-[#8E33FF]/20">
                  <Zap className="w-5 h-5 text-[#3AA1FF]" />
                </div>
                <h3 className="font-tech text-xl text-white">Transform Your Business</h3>
              </div>
              <p className="text-lg font-normal text-gray-300 leading-relaxed">
                {t.landingPage.hero.subtitle}
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] hover:opacity-90 text-white w-full py-6 rounded-xl text-lg font-tech font-semibold transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Link to="/auth?mode=register"><MessageSquare className="mr-2 h-5 w-5" /> {t.landingPage.hero.startChatting}</Link>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className={`${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}
                >
                  {t.landingPage.hero.exploreMore}
                </Button>
              </div>
              
              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                  <img src="/Smart_service_logo.png" alt="Logo" className="w-8 h-8 rounded-full shadow-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative perspective-1000">
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-[#3AA1FF]/20 to-[#8E33FF]/20 blur-xl opacity-70 animate-pulse-glow"></div>
            <div className="flex items-center justify-center transform-style-preserve-3d">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] rounded-3xl blur opacity-50 animate-pulse-glow"></div>
                {/* Main logo */}
                <img 
                  className={`relative w-full max-w-md mx-auto animate-float animate-logo-pulse transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  src="/Smart_service_logo.png" 
                  alt="Smart Service Logo"
                  style={{ 
                    transform: `translateY(${scrollPosition * 0.05}px) rotateY(${scrollPosition * 0.02}deg)` 
                  }}
                />
                
                {/* Replace circles with small logos */}
                <div className="absolute -top-12 -left-12 animate-float" style={{ animationDelay: '0.2s' }}>
                  <img 
                    src="/Smart_service_logo.png" 
                    alt="Logo Decoration" 
                    className="w-12 h-12 opacity-60"
                  />
                </div>
                <div className="absolute -bottom-16 -right-8 animate-float" style={{ animationDelay: '0.7s' }}>
                  <img 
                    src="/Smart_service_logo.png" 
                    alt="Logo Decoration" 
                    className="w-16 h-16 opacity-40"
                  />
                </div>
                <div className="absolute top-1/2 -right-14 animate-float" style={{ animationDelay: '1.2s' }}>
                  <img 
                    src="/Smart_service_logo.png" 
                    alt="Logo Decoration" 
                    className="w-10 h-10 opacity-50"
                  />
                </div>
                <div className="absolute -bottom-6 left-10 animate-float" style={{ animationDelay: '0.5s' }}>
                  <img 
                    src="/Smart_service_logo.png" 
                    alt="Logo Decoration" 
                    className="w-8 h-8 opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Star gradient definition */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="star-gradient" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3AA1FF" />
            <stop offset="100%" stopColor="#8E33FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Zigzag divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0 L60,60 L120,0 L180,60 L240,0 L300,60 L360,0 L420,60 L480,0 L540,60 L600,0 L660,60 L720,0 L780,60 L840,0 L900,60 L960,0 L1020,60 L1080,0 L1140,60 L1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
