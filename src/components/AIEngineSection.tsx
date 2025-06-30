import { Globe, Zap, Shield, FileSearch, BrainCircuit, Hexagon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/inputs/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AIEngineSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Globe,
      title: t.landingPage.capabilities.chat.multilingual.title,
      description: t.landingPage.capabilities.chat.multilingual.description,
      stats: "98.9% accuracy",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: t.landingPage.capabilities.chat.realTime.title,
      description: t.landingPage.capabilities.chat.realTime.description,
      stats: "< 2 seconds",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Fully Private & Secure",
      description: t.landingPage.capabilities.search.semantic.description,
      stats: "SOC 2 Certified",
      color: "from-fuchsia-500 to-pink-500"
    }
  ];

  // Stats from FloatingStats component
  const stats = [
    { icon: FileSearch, value: '99.8%', label: 'OCR Accuracy', color: 'from-blue-500 to-cyan-500' },
    { icon: BrainCircuit, value: 'Fast', label: 'Reasoning', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, value: 'SOC 2', label: 'Compliance', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, value: '200ms', label: 'Response Time', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <section id="ai-engine" className="py-32 relative overflow-hidden bg-[#080E21]">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1437] via-[#162454] to-[#0D1333] opacity-80"></div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}>
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/5 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 filter blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/5 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 filter blur-3xl animate-float animation-delay-2000"></div>

      {/* Advanced star field with shooting stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 4}px rgba(255, 255, 255, 0.8)`,
              animationDuration: `${Math.random() * 30 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
              animation: i % 15 === 0 ? 'shooting-star 8s linear infinite' : ''
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hexagonal title area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="w-full md:w-1/2">
            <div className="relative mb-8">
              <span className="inline-block py-1 px-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full mb-4">SMART SERVICE</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold text-white mb-6 leading-tight">
                {t.landingPage.capabilities.title}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
            
            <p className="text-lg sm:text-xl text-blue-100 max-w-xl leading-relaxed mb-8">
              {t.landingPage.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group relative perspective-1000"
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-500 transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 shadow-lg">                    
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="text-2xl font-black text-white font-tech">
                          {stat.value}
                        </div>
                        <div className="text-blue-200 text-sm">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                    
                    {/* Light reflection effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute -inset-[150%] w-[400%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 translate-x-[-120%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Logo visualization with futuristic elements */}
          <div className="relative w-full md:w-1/2 flex justify-center items-center">
            <div className="relative transform-style-preserve-3d perspective-1000">
              {/* Rotating hex grid background */}
              <div className="absolute inset-0 animate-spin-slow" style={{ transformStyle: 'preserve-3d' }}>
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      transform: `rotateZ(${i * 60}deg) translateY(-120px)`,
                      opacity: 0.4
                    }}
                  >
                    <Hexagon className="w-10 h-10 text-blue-500/30" />
                  </div>
                ))}
              </div>
              
              {/* Secondary hex grid */}
              <div className="absolute inset-0 animate-spin-slow" style={{ 
                transformStyle: 'preserve-3d',
                animation: 'spin-slow 25s linear infinite reverse'
              }}>
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      transform: `rotateZ(${i * 45}deg) translateY(-180px)`,
                      opacity: 0.2
                    }}
                  >
                    <Hexagon className="w-8 h-8 text-purple-500/30" />
                  </div>
                ))}
              </div>
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3AA1FF]/30 via-purple-600/30 to-[#0A1F44]/40 blur-3xl animate-pulse"></div>
              
              {/* The logo */}
              <div className="relative z-10">
                <img
                  src="/Smart_service_logo.png"
                  alt="Smart Service Logo"
                  className="relative w-72 h-72 object-contain animate-float logo-glow"
                />
              </div>
              
              {/* Interactive particles */}
              <div className="absolute top-0 left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
              <div className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transform -translate-x-1/2 translate-y-1/2 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.8)] animation-delay-1000"></div>
              <div className="absolute top-1/2 left-0 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_15px_rgba(20,184,166,0.8)] animation-delay-2000"></div>
              <div className="absolute top-1/2 right-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 transform translate-x-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_15px_rgba(244,114,182,0.8)] animation-delay-3000"></div>
              
              {/* Data stream animations */}
              <div className="absolute top-1/2 left-0 w-40 h-[1px] bg-gradient-to-r from-blue-500 to-transparent animate-data-stream"></div>
              <div className="absolute bottom-1/4 right-0 w-64 h-[1px] bg-gradient-to-l from-purple-500 to-transparent animate-data-stream animation-delay-2000"></div>
              <div className="absolute top-1/4 right-0 w-32 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent animate-data-stream animation-delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Features in hexagonal containers */}
        <div className="grid md:grid-cols-3 gap-10 relative z-10 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div 
                className="hexagon-container bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 group overflow-hidden"
                style={{ 
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Feature icon with gradient background */}
                <div className="mb-6">
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white relative z-10" />
                    {/* Animated ripple effect */}
                    <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl group-hover:scale-[2.5] transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
                  </div>
                </div>
                
                {/* Feature content */}
                <div>
                  <h3 className="text-2xl font-tech font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className={`inline-block bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {feature.stats}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Hexagon className="w-20 h-20 text-white" strokeWidth={1} />
                </div>
                
                {/* Light sweep effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-[150%] w-[400%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 translate-x-[-120%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* GET STARTED button */}
        <div className="flex justify-center mt-16 mb-8 relative z-10">
          <div className="relative group">
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full opacity-70 group-hover:opacity-100 blur-md transition-all duration-500"></div>
            
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-7 rounded-full text-xl font-tech font-semibold shadow-xl flex items-center gap-3 group-hover:scale-105 transition-all duration-500"
              asChild
            >
              <Link to="/auth">
                {t.landingPage.cta.button} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Modern wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20 fill-[#0A1F44]">
          <path d="M0,64 C288,104 480,16 720,16 C960,16 1152,104 1440,64 L1440,120 L0,120 Z" className="fill-[#0A1F44]"></path>
          <path d="M0,6ù4 C288,89 480,42 720,42 C960,42 1152,89 1440,64 L1440,120 L0,120 Z" className="fill-[#0A1F44] opacity-50"></path>
        </svg>
      </div>
    </section>
  );
};

export default AIEngineSection;
