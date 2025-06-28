import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface ImageCarouselProps {
  theme: 'dark' | 'light';
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample images - replace with your actual images
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop&crop=center',
      title: 'Document Analysis',
      description: 'AI-powered document processing and analysis'
    },
    {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&crop=center',
      title: 'Smart Conversations',
      description: 'Natural language interactions with advanced AI'
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center',
      title: 'Voice Recognition',
      description: 'Speak naturally and get instant responses'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center',
      title: 'Data Visualization',
      description: 'Transform complex data into clear insights'
    },
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center',
      title: 'Analytics Dashboard',
      description: 'Real-time monitoring and detailed reporting'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl ${
        theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700/30' 
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              {/* Background image */}
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${images[currentIndex].url})`
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl md:text-4xl font-bold text-white mb-3"
                >
                  {images[currentIndex].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-lg md:text-xl text-gray-200 max-w-md"
                >
                  {images[currentIndex].description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-gray-800/70 hover:bg-gray-700/80 text-white'
              : 'bg-white/70 hover:bg-white/90 text-gray-700'
          } backdrop-blur-sm shadow-lg hover:scale-110`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-gray-800/70 hover:bg-gray-700/80 text-white'
              : 'bg-white/70 hover:bg-white/90 text-gray-700'
          } backdrop-blur-sm shadow-lg hover:scale-110`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Auto-play toggle */}
        <button
          onClick={toggleAutoPlay}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-gray-800/70 hover:bg-gray-700/80 text-white'
              : 'bg-white/70 hover:bg-white/90 text-gray-700'
          } backdrop-blur-sm shadow-lg hover:scale-110`}
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : theme === 'dark'
                ? 'bg-gray-400/50 hover:bg-gray-300/70'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlaying ? "100%" : "0%" }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          key={currentIndex}
        />
      </div>
    </motion.div>
  );
};

export default ImageCarousel;