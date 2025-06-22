import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  BarChart3, 
  Upload, 
  ArrowRight, 
  FileText, 
  Image, 
  Mic, 
  MessageSquare, 
  Search, 
  Zap, 
  FileImage,
  Brain,
  Sparkles,
  Lightbulb,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/inputs/button";
import { Card } from "@/components/ui/data-display/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  onNavigate: (section: "home" | "chat") => void;
};

const HomeSection: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [showDemo, setShowDemo] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleChatNavigation = () => {
    onNavigate("chat");
  };

  // Features carousel data
  const features = [
    {
      title: t.landingPage.features.documentAnalysis.title,
      description: t.landingPage.features.documentAnalysis.description,
      icon: <FileImage className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: t.landingPage.features.conversations.title,
      description: t.landingPage.features.conversations.description,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t.landingPage.features.voice.title,
      description: t.landingPage.features.voice.description,
      icon: <Mic className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: t.landingPage.features.search.title,
      description: t.landingPage.features.search.description,
      icon: <Search className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
    }
  ];

  // Demo conversation
  const demoConversation = [
    { role: "user", content: "Can you analyze this invoice and tell me the total amount?" },
    { role: "assistant", content: "I've analyzed the invoice image. The total amount is $1,249.99. It's from TechSupplies Inc., dated March 15, 2023, with invoice #INV-20230315. Would you like me to extract any other information?" },
    { role: "user", content: "What items were purchased?" },
    { role: "assistant", content: "Based on the invoice, these items were purchased:\n\n1. Laptop Pro X1 - $899.99 (1 unit)\n2. Extended Warranty - $149.99 (1 unit)\n3. Wireless Mouse - $49.99 (1 unit)\n4. USB-C Hub - $59.99 (2 units)\n\nSubtotal: $1,159.95\nTax (7.75%): $89.90\nTotal: $1,249.99" }
  ];

  return (
    <div className={`max-w-6xl mx-auto flex flex-col gap-10 pb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      {/* Welcome hero panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 md:p-12 text-center rounded-3xl ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-[#0F2027]/80 via-[#203A43]/80 to-[#2C5364]/80 border border-gray-700/50' 
            : 'bg-gradient-to-br from-[#E0EAFC]/80 to-[#CFDEF3]/80 border border-gray-200/50'
        } backdrop-blur-md shadow-xl`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Brain className="h-10 w-10 text-white" />
          </div>
        </motion.div>
        
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient-blue' : 'text-gradient-blue-light'}`}>
          {t.landingPage.hero.title}
        </h1>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {t.landingPage.hero.subtitle}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handleChatNavigation}
            size="lg"
            className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all`}
          >
            <MessageSquare className="mr-2 h-5 w-5" /> {t.landingPage.hero.startChatting}
          </Button>
          
          <Button 
            onClick={() => setShowDemo(!showDemo)}
            variant="outline"
            size="lg"
            className={`${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            {showDemo ? t.landingPage.hero.hideDemo : t.landingPage.hero.seeDemo}
          </Button>
        </div>
      </motion.div>

      {/* Demo conversation */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className={`p-6 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50'
              } backdrop-blur-md shadow-lg`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {t.landingPage.demo.title}
              </h2>
              
              <div className="flex flex-col gap-4">
                {/* Demo image */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} flex justify-center`}>
                  <div className="relative max-w-md">
                    <img 
                      src="https://placehold.co/600x400/2563eb/FFFFFF/png?text=Sample+Invoice+Image" 
                      alt="Sample Invoice" 
                      className="rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg pointer-events-none"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-md text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        <Sparkles className="inline-block h-4 w-4 mr-1" /> {t.landingPage.demo.ocrProcessing}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Demo conversation */}
                <div className="space-y-4 mt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex justify-end"
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                      theme === 'dark'
                        ? 'bg-blue-600/80 text-white'
                        : 'bg-blue-500/80 text-white'
                    }`}>
                      <p className="whitespace-pre-wrap">{t.landingPage.demo.demoMessages.user1}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                      theme === 'dark'
                        ? 'bg-gray-700/80 text-white'
                        : 'bg-white/80 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap">{t.landingPage.demo.demoMessages.assistant1}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="flex justify-end"
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                      theme === 'dark'
                        ? 'bg-blue-600/80 text-white'
                        : 'bg-blue-500/80 text-white'
                    }`}>
                      <p className="whitespace-pre-wrap">{t.landingPage.demo.demoMessages.user2}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                      theme === 'dark'
                        ? 'bg-gray-700/80 text-white'
                        : 'bg-white/80 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap">{t.landingPage.demo.demoMessages.assistant2}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full"
      >
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {t.landingPage.features.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature cards */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0, 255, 200, 0.15)" }}
              className={`p-6 rounded-2xl cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50' 
                  : 'bg-white/70 border border-gray-200/50 hover:border-blue-500/50'
              } backdrop-blur-md shadow-lg`}
              onClick={() => setActiveFeature(index)}
            >
              <div className={`bg-gradient-to-br ${feature.color} rounded-full p-3 w-fit mb-4`}>
                {feature.icon}
          </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {feature.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
          </div>
        </motion.div>

      {/* Capabilities section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`p-6 rounded-2xl ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border border-gray-700/50' 
            : 'bg-white/70 border border-gray-200/50'
        } backdrop-blur-md shadow-lg`}
      >
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {t.landingPage.capabilities.title}
        </h2>
        
        <Tabs defaultValue="ocr" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="ocr">{t.landingPage.capabilities.tabs.ocr}</TabsTrigger>
            <TabsTrigger value="chat">{t.landingPage.capabilities.tabs.chat}</TabsTrigger>
            <TabsTrigger value="voice">{t.landingPage.capabilities.tabs.voice}</TabsTrigger>
            <TabsTrigger value="search">{t.landingPage.capabilities.tabs.search}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ocr" className="space-y-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <FileImage className="inline-block mr-2 h-5 w-5" /> {t.landingPage.capabilities.ocr.title}
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.landingPage.capabilities.ocr.description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {t.landingPage.capabilities.ocr.items.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className={`h-4 w-4 mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className={`flex-1 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <h4 className="font-medium mb-2">{t.landingPage.capabilities.ocr.fileTypes}</h4>
                <div className="flex flex-wrap gap-2">
                  {['PNG', 'JPEG', 'PDF', 'TIFF', 'WEBP'].map((format, i) => (
                    <span key={i} className={`px-2 py-1 text-xs rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-600 text-gray-200' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={`flex-1 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <h4 className="font-medium mb-2">{t.landingPage.capabilities.ocr.imageAnalysis.title}</h4>
                <p className="text-sm">
                  {t.landingPage.capabilities.ocr.imageAnalysis.description}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chat">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <MessageSquare className="inline-block mr-2 h-5 w-5" /> Conversational AI
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Engage in natural conversations with our AI assistant powered by Google's Gemini 2.0 technology:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'}`}>
                  <h4 className="font-medium mb-1 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" /> Context Awareness
                  </h4>
                  <p className="text-sm">
                    Our AI remembers conversation history and maintains context throughout your chat session.
                  </p>
                </div>
                
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'}`}>
                  <h4 className="font-medium mb-1 flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> Document Q&A
                  </h4>
                  <p className="text-sm">
                    Ask specific questions about your uploaded documents and get precise answers.
                  </p>
                </div>
                
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'}`}>
                  <h4 className="font-medium mb-1 flex items-center">
                    <Zap className="h-4 w-4 mr-2" /> Real-time Responses
                  </h4>
                  <p className="text-sm">
                    Get instant answers with our streaming response technology that shows results as they're generated.
                  </p>
                </div>
                
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'}`}>
                  <h4 className="font-medium mb-1 flex items-center">
                    <Brain className="h-4 w-4 mr-2" /> Multilingual Support
                  </h4>
                  <p className="text-sm">
                    Communicate in multiple languages with our AI that understands and responds in your preferred language.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="voice">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <Mic className="inline-block mr-2 h-5 w-5" /> Voice Interaction
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Communicate with our AI using your voice for a hands-free experience:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Voice Recording</h4>
                    <p className="text-sm">Record voice messages directly in the chat interface with a single click.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Audio Processing</h4>
                    <p className="text-sm">Our AI can process audio files and respond to questions about their content.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Accessibility</h4>
                    <p className="text-sm">Voice interaction makes our AI accessible to users with different needs and preferences.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="search">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <Search className="inline-block mr-2 h-5 w-5" /> Smart Document Search
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Quickly find information across your documents with our intelligent search capabilities:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'}`}>
                  <h4 className="font-medium mb-2">Semantic Search</h4>
                  <p className="text-sm">
                    Our AI understands the meaning behind your search queries, not just keywords, providing more relevant results.
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'}`}>
                  <h4 className="font-medium mb-2">Cross-Document Analysis</h4>
                  <p className="text-sm">
                    Search across multiple documents at once to find connections and insights that might otherwise be missed.
                  </p>
                </div>
          </div>
              

          </div>
          </TabsContent>
        </Tabs>
        </motion.div>

      {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`p-8 rounded-2xl text-center ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-800/30' 
            : 'bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200/50'
        }`}
      >
        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {t.landingPage.cta.title}
        </h2>
        <p className={`max-w-2xl mx-auto mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {t.landingPage.cta.description}
        </p>
        <Button 
          onClick={handleChatNavigation}
          size="lg"
          className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all`}
        >
          <MessageSquare className="mr-2 h-5 w-5" /> {t.landingPage.cta.button}
        </Button>
        </motion.div>
    </div>
  );
};

export default HomeSection; 