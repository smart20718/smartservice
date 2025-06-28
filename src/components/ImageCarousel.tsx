import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, BarChart3, Bell, Archive, Bot, Search } from 'lucide-react';

interface ImageCarouselProps {
  theme?: 'dark' | 'light';
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ theme = 'dark' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Contenu basé sur les images fournies
  const slides = [
    {
      icon: BarChart3,
      title: 'Analyse intelligente et rapports',
      items: [
        'Tableau de bord',
        'Graphiques avancés',
        'Rapports personnalisés',
        'Visualisation des données',
        'Métriques en temps réel'
      ],
      gradient: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    {
      icon: Bell,
      title: 'Alertes intelligentes',
      items: [
        'Nouveau document',
        'Document modifié',
        'Date d\'échéance',
        'Commentaire sur document',
        'Notifications en temps réel'
      ],
      gradient: 'from-purple-600 to-pink-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50'
    },
    {
      icon: Archive,
      title: 'Numérisation',
      items: [
        'Classification automatique',
        'Titre',
        'Auteur',
        'Encadrant',
        'Niveau',
        'Date',
        'Discipline',
        'Lieu'
      ],
      gradient: 'from-green-600 to-teal-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50'
    },
    {
      icon: Bot,
      title: 'Assistant IA',
      items: [
        'Téléverser un document (PDF ou image)',
        'Analyser avec OCR',
        'Résumer',
        'Traduire',
        'Poser une question',
        'ChatGPT intégré'
      ],
      gradient: 'from-orange-600 to-red-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50'
    },
    {
      icon: Search,
      title: 'Recherche intelligente et vocale',
      items: [
        'Recherche vocale',
        'Résultats pertinents',
        'Comprendre le langage naturel',
        'Recherche avancée',
        'Filtres intelligents'
      ],
      gradient: 'from-indigo-600 to-blue-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentSlide = slides[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full h-96 md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl ${
        theme === 'dark' 
          ? 'bg-gray-900 border border-gray-700/30' 
          : 'bg-white border border-gray-200/30'
      }`}
    >
      {/* Main carousel container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className={`relative w-full h-full ${theme === 'light' ? currentSlide.bgColor : ''}`}>
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} ${theme === 'light' ? 'opacity-10' : 'opacity-90'}`} />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 py-8">
                <div className="flex items-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`p-3 rounded-2xl mr-4 ${
                      theme === 'dark' 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-white shadow-lg'
                    }`}
                  >
                    <IconComponent 
                      className={`h-8 w-8 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-700'
                      }`} 
                    />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`text-2xl md:text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {currentSlide.title}
                  </motion.h2>
                </div>

                {/* Items list */}
                <div className="space-y-3 max-w-2xl">
                  {currentSlide.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                      className="flex items-center"
                    >
                      <div className={`w-2 h-2 rounded-full mr-4 ${
                        theme === 'dark' 
                          ? 'bg-white/70' 
                          : 'bg-gray-600'
                      }`} />
                      <span className={`text-lg md:text-xl ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-700'
                      }`}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              : 'bg-white/80 hover:bg-white/95 text-gray-700 shadow-lg'
          } hover:scale-110 border border-white/20`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              : 'bg-white/80 hover:bg-white/95 text-gray-700 shadow-lg'
          } hover:scale-110 border border-white/20`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Auto-play toggle */}
        <button
          onClick={toggleAutoPlay}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              : 'bg-white/80 hover:bg-white/95 text-gray-700 shadow-lg'
          } hover:scale-110 border border-white/20`}
        >
          {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : theme === 'dark'
                ? 'bg-white/40 hover:bg-white/60'
                : 'bg-gray-400/60 hover:bg-gray-600/80'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <motion.div
          className={`h-full bg-gradient-to-r ${currentSlide.gradient}`}
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlaying ? "100%" : "0%" }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
          key={currentIndex}
        />
      </div>

      {/* Theme toggle for demo */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          theme === 'dark' 
            ? 'bg-white/20 text-white backdrop-blur-sm' 
            : 'bg-gray-800/80 text-white'
        }`}>
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCarousel;