import { FileText, Bell, Mic, BarChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  
  const features = [
    { icon: FileText, text: t.landingPage.features.documentAnalysis.title },
    { icon: Bell, text: t.landingPage.capabilities.chat.realTime.title }, 
    { icon: Mic, text: t.landingPage.features.voice.title },
    { icon: BarChart, text: t.landingPage.features.search.title }
  ];

  return (
    <section id="about" className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#0A1F44] mb-8 leading-tight">
                {t.landingPage.aboutSection.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.landingPage.features.documentAnalysis.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105 group opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-12 h-12 bg-[#3AA1FF] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="bg-gradient-to-br from-[#3AA1FF] to-[#0A1F44] p-2 rounded-3xl shadow-2xl">
                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                    alt="Document management interface" 
                    className="w-full h-96 object-cover rounded-xl relative z-10"
                  />
                  {/* Floating elements for 3D effect */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-[#3AA1FF] rounded-full opacity-20 animate-pulse z-20"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#0A1F44] rounded-lg opacity-30 animate-pulse delay-500 z-20"></div>
                </div>
              </div>
            </div>
            
            {/* Floating accent elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#3AA1FF] rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0A1F44] rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-gray-50">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="animate-pulse"></path>
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;
