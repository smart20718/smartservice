import { Play, ChevronDown, FileText, Zap, MessageSquare, Files, FileCheck, FileEdit } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";

// Mock components and hooks for demonstration
const Button = ({ children, asChild, size, className, variant, onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const sizeClasses = size === "lg" ? "h-11 px-8 py-2" : "h-10 px-4 py-2";
  const variantClasses = variant === "outline" ? "border border-input hover:bg-accent hover:text-accent-foreground" : "";
  
  if (asChild) {
    return <div className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>{children}</div>;
  }
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const timer = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (currentCharIndex < currentWord.text.length) {
          setDisplayText(prev => prev + currentWord.text[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        } else {
          if (currentWordIndex < words.length - 1) {
            setDisplayText(prev => prev + " ");
            setCurrentWordIndex(prev => prev + 1);
            setCurrentCharIndex(0);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentWordIndex, currentCharIndex, isDeleting, words]);

  return (
    <div className={className}>
      <span className="text-2xl sm:text-3xl lg:text-4xl font-normal">
        {words?.map((word, idx) => (
          <span key={idx} className={word.className}>
            {idx <= currentWordIndex ? (idx === currentWordIndex ? displayText.split(' ').pop() : word.text) : ''}
            {idx < words.length - 1 && idx < currentWordIndex ? ' ' : ''}
          </span>
        ))}
        <span className={`${cursorClassName} inline-block w-0.5 h-6 ml-1 animate-pulse`}>|</span>
      </span>
    </div>
  );
};

// Mock translation object
const mockTranslations = {
  landingPage: {
    hero: {
      typewriter: [
        "Révolutionnez votre entreprise avec l'IA",
        "Solutions intelligentes pour défis modernes",
        "Transformez les processus avec intelligence",
        "Automatisez les opérations en toute simplicité"
      ],
      subtitle: "Exploitez la puissance de l'intelligence artificielle pour rationaliser les opérations, améliorer l'expérience client et générer une croissance sans précédent dans votre entreprise.",
      startChatting: "Commencer à discuter",
      exploreMore: "Explorer davantage"
    }
  }
};

const HeroSection = () => {
  const t = mockTranslations; // Mock useLanguage hook
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Memoize the typewriter words to prevent unnecessary recalculations
  const miniTitles = useMemo(() => {
    return t.landingPage.hero.typewriter.map((sentence) => {
      return sentence.split(" ").map((word, idx) => {
        let cls = "text-white";
        if (idx === 0) cls = "text-[#3AA1FF]";
        if (word.toLowerCase().includes("ia") || word.toLowerCase().includes("ai")) {
          cls = "text-[#8E33FF]";
        }
        return { text: word, className: cls };
      });
    });
  }, [t.landingPage.hero.typewriter]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Only update if scroll difference is significant to reduce re-renders
    if (Math.abs(scrollY - scrollPosition) > 2) {
      setScrollPosition(scrollY);
    }
  }, [scrollPosition]);

  // Smooth scroll function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    // Throttled scroll listener
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Intersection Observer for better performance
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const heroElement = document.getElementById('home');
    if (heroElement) observer.observe(heroElement);
    
    // Title rotation with cleanup
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % miniTitles.length);
    }, 4000);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [handleScroll, miniTitles.length]);

  return (
    <section 
      id="home" 
      className="relative py-16 overflow-hidden bg-black sm:pb-20 lg:pb-24 xl:pb-32"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background effects with reduced motion for accessibility */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg 
          className="blur-3xl filter opacity-70 motion-safe:animate-pulse" 
          style={{ filter: 'blur(64px)' }} 
          width="444" 
          height="536" 
          viewBox="0 0 444 536" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" 
            fill="url(#hero-gradient)" 
          />
          <defs>
            <linearGradient id="hero-gradient" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3AA1FF" />
              <stop offset="100%" stopColor="#8E33FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0" aria-hidden="true">
        <div 
          className="absolute inset-0 bg-black bg-[radial-gradient(#3AA1FF_1px,transparent_1px)] [background-size:32px_32px] opacity-20"
          style={{ backgroundPosition: "0 0" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-20" />
      </div>
      
      {/* Main content */}
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Brand indicator */}
            <div className="flex items-center space-x-3 mb-6" role="img" aria-label="Smart Service brand">
              <div className="w-8 h-8 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] rounded-lg flex items-center justify-center motion-safe:animate-pulse">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF]" />
            </div>
            
            {/* Main heading with better typography */}
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-none">
              Smart{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] bg-clip-text text-transparent">
                  Service
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] transform scale-x-0 motion-safe:animate-pulse" />
              </span>
            </h1>
            
            {/* Typewriter effect with consistent height */}
            <div className="mt-6 min-h-[80px] sm:min-h-[96px] lg:min-h-[112px]">
              {isIntersecting && (
                <TypewriterEffectSmooth 
                  key={currentTitleIndex}
                  words={miniTitles[currentTitleIndex]} 
                  className="text-center lg:text-left" 
                  cursorClassName="bg-[#3AA1FF]"
                />
              )}
            </div>
            
            {/* Enhanced CTA card */}
            <div className="mt-8 sm:mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 rounded-lg bg-gradient-to-r from-[#3AA1FF]/20 to-[#8E33FF]/20">
                  <Zap className="w-5 h-5 text-[#3AA1FF]" />
                </div>
                <h2 className="text-xl text-white font-semibold">Transform Your Business</h2>
              </div>
              <p className="text-lg font-normal text-gray-300 leading-relaxed mb-6">
                {t.landingPage.hero.subtitle}
              </p>
              
              {/* Improved button layout */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] hover:opacity-90 hover:scale-[1.02] text-white flex-1 py-6 rounded-xl text-lg font-semibold transition-all duration-300 focus:ring-2 focus:ring-[#3AA1FF] focus:ring-offset-2 focus:ring-offset-black"
                  variant="default"
                  onClick={() => {}}
                >
                  <div>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {t.landingPage.hero.startChatting}
                  </div>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-600 hover:bg-gray-800 text-white hover:text-white transition-all duration-300 focus:ring-2 focus:ring-gray-400"
                  onClick={() => scrollToSection('about')}
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  {t.landingPage.hero.exploreMore}
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced logo section */}
          <div className="relative" role="img" aria-label="Smart Service logo showcase">
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-[#3AA1FF]/20 to-[#8E33FF]/20 blur-xl opacity-70 motion-safe:animate-pulse" />
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3AA1FF] to-[#8E33FF] rounded-3xl blur opacity-50 motion-safe:animate-pulse" />
                
                {/* Main logo with optimized transform */}
                <div 
                  className={`relative w-full max-w-md mx-auto motion-safe:animate-pulse transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ 
                    transform: `translateY(${scrollPosition * 0.02}px) rotateY(${scrollPosition * 0.01}deg)` 
                  }}
                >
                  <div className="w-80 h-80 bg-gradient-to-br from-[#3AA1FF] to-[#8E33FF] rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                    {/* Document stack background effect */}
                    <div className="absolute inset-4 bg-white/10 rounded-2xl transform rotate-3"></div>
                    <div className="absolute inset-6 bg-white/10 rounded-xl transform -rotate-2"></div>
                    <div className="absolute inset-8 bg-white/20 rounded-lg"></div>
                    
                    {/* Main document icon */}
                    <Files className="w-32 h-32 text-white relative z-10" />
                    
                    {/* Floating document elements */}
                    <div className="absolute top-4 right-4 text-white/60">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white/60">
                      <FileEdit className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                {/* Floating decorative elements */}
                {[
                  { top: '-3rem', left: '-3rem', delay: '0.2s', size: 'w-12 h-12', icon: FileText },
                  { bottom: '-4rem', right: '-2rem', delay: '0.7s', size: 'w-16 h-16', icon: Files },
                  { top: '50%', right: '-3.5rem', delay: '1.2s', size: 'w-10 h-10', icon: FileCheck },
                  { bottom: '-1.5rem', left: '2.5rem', delay: '0.5s', size: 'w-8 h-8', icon: FileEdit }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute ${item.size} motion-safe:animate-pulse opacity-60`}
                      style={{
                        ...Object.fromEntries(Object.entries(item).filter(([key]) => ['top', 'left', 'bottom', 'right'].includes(key))),
                        animationDelay: item.delay
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#3AA1FF]/40 to-[#8E33FF]/40 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <IconComponent className="w-1/2 h-1/2 text-white" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improved zigzag divider */}
      <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0 L60,60 L120,0 L180,60 L240,0 L300,60 L360,0 L420,60 L480,0 L540,60 L600,0 L660,60 L720,0 L780,60 L840,0 L900,60 L960,0 L1020,60 L1080,0 L1140,60 L1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;