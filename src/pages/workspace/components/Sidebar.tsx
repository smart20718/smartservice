import React, { useState } from "react";
import { Home, BookOpen, X, ChevronRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UserProfileSection } from "./user-profile";
import { useLanguage } from "@/contexts/LanguageContext";

type SectionKey = "home" | "chat" | "settings";

interface SidebarProps {
  isOpen?: boolean; // for mobile drawer
  active: SectionKey;
  onNavigate: (section: SectionKey) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, active, onNavigate, onClose }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useLanguage();

  // Build sidebar items dynamically so we can use translations
  const items: { key: SectionKey; label: string; icon: JSX.Element; disabled?: boolean }[] = [
    { key: "home", label: t.workspace.sidebar.home, icon: <Home className="h-5 w-5" /> },
    { key: "chat", label: "Chatbot", icon: <BookOpen className="h-5 w-5" /> }, // Chatbot remains untranslated as requested
  ];

  const handleNavigation = (section: SectionKey) => {
    onNavigate(section);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <motion.div
          className="h-full flex flex-col bg-gradient-to-b from-[#E0EAFC] to-[#CFDEF3] dark:from-[#0c0c15] dark:to-[#121225] border-r border-black/10 dark:border-white/5 w-[300px] shrink-0 z-30 relative overflow-hidden"
          animate={{
            width: sidebarOpen ? "300px" : "80px",
          }}
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
        >
          {/* Background effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-command-teal/10 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-purple-500/10 to-transparent opacity-20"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMzAiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJWNGgydjIyem0tNCAwaC0yVjhoMnYxOHptLTQgOGgtMnYtMmgydjJ6bTAtNGgtMnYtNGgydjR6bTAtOGgtMlY0aDJ2MTh6bS00IDRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCA4aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjhoMnYyem0tNCAxMmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHptLTQgMjBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCAxNmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHptLTQgMjRoLTJ2LThoMnY4em0wLTEyaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjhoMnYyem0tNCAxNmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
          </div>

          {/* Content container - above the background effects */}
          <motion.div 
            className="h-full flex flex-col z-10 relative"
            animate={{
              width: sidebarOpen ? "300px" : "80px",
            }}
          >
            {/* Logo */}
            <div className="flex items-center justify-center p-5 border-b border-white/5">
              <motion.img 
                src="/Smart_service_logo.png" 
                alt="Smart Service" 
                className="h-8 w-auto"
                animate={{
                  opacity: 1
                }}
              />
            </div>

            {/* Navigation links */}
            <nav className="flex-1 py-8 px-3">
              <ul className="space-y-4">
                {items.map(({ key, label, icon, disabled }) => {
                  const activeItem = key === active;
                  return (
                    <motion.li 
                      key={key}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <button
                        onClick={() => !disabled && handleNavigation(key)}
                        disabled={disabled}
                        className={cn(
                          "group relative flex items-center w-full gap-3 py-3 px-4 rounded-xl transition-all duration-300",
                          activeItem
                            ? "bg-gradient-to-r from-command-teal/20 to-transparent text-command-teal dark:text-command-teal"
                            : "text-blue-700 dark:text-white/80 hover:text-blue-900 dark:hover:text-white",
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
                          activeItem ? "bg-command-teal/20 text-command-teal dark:text-command-teal" : "text-blue-700 dark:text-white/80 group-hover:text-blue-900 dark:group-hover:text-white"
                        )}>
                          {icon}
                        </div>
                        
                        <motion.span
                          animate={{
                            display: sidebarOpen ? "inline-block" : "none",
                            opacity: sidebarOpen ? 1 : 0,
                          }}
                          className="text-sm font-medium whitespace-pre transition duration-150"
                        >
                          {label}
                        </motion.span>
                        
                        {disabled && sidebarOpen && (
                          <motion.span
                            animate={{
                              display: sidebarOpen ? "inline-block" : "none",
                              opacity: sidebarOpen ? 1 : 0,
                            }}
                            className="ml-auto text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-white/10 dark:text-white/70"
                          >
                            Soon
                          </motion.span>
                        )}
                        
                        {activeItem && (
                          <>
                            <motion.div 
                              className="absolute left-0 top-0 h-full w-1 bg-command-teal rounded-r-full"
                              layoutId="activeIndicator"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <motion.div 
                              className="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                              animate={{
                                display: sidebarOpen ? "block" : "none",
                              }}
                            >
                              <ChevronRight className="h-4 w-4 text-command-teal" />
                            </motion.div>
                          </>
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            
            {/* User Profile Section */}
            <UserProfileSection isExpanded={sidebarOpen} onNavigate={handleNavigation} />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#0c0c15] to-[#121225] border-b border-white/5 fixed top-0 z-20">
        <img src="/Smart_service_logo.png" alt="Smart Service" className="h-8 w-auto" />
        <button onClick={() => onClose && onClose()} aria-label="Open menu" className="text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => onClose && onClose()}
            />
            
            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-gradient-to-b from-[#E0EAFC] to-[#CFDEF3] dark:from-[#0c0c15] dark:to-[#121225] p-6 z-40 flex flex-col md:hidden overflow-hidden"
            >
              {/* Background effects for mobile */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-command-teal/10 to-transparent opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-purple-500/10 to-transparent opacity-20"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMzAiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJWNGgydjIyem0tNCAwaC0yVjhoMnYxOHptLTQgOGgtMnYtMmgydjJ6bTAtNGgtMnYtNGgydjR6bTAtOGgtMlY0aDJ2MTh6bS00IDRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCA4aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjhoMnYyem0tNCAxMmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHptLTQgMjBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNCAxNmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHptLTQgMjRoLTJ2LThoMnY4em0wLTEyaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjhoMnYyem0tNCAxNmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
              </div>
              
              {/* Content container - above the background effects */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <img src="/Smart_service_logo.png" alt="Smart Service" className="h-8 w-auto" />
                  <button 
                    onClick={() => onClose && onClose()} 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-blue-700 dark:text-white hover:bg-blue-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-3">
                    {items.map(({ key, label, icon, disabled }) => {
                      const activeItem = key === active;
                      return (
                        <motion.li 
                          key={key}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <button
                            onClick={() => {
                              if (!disabled) {
                                handleNavigation(key);
                                onClose && onClose();
                              }
                            }}
                            disabled={disabled}
                            className={cn(
                              "group relative flex items-center w-full gap-3 py-3 px-4 rounded-xl transition-all duration-300",
                              activeItem
                                ? "bg-gradient-to-r from-command-teal/20 to-transparent text-command-teal dark:text-command-teal"
                                : "text-blue-700 dark:text-white/80 hover:text-blue-900 dark:hover:text-white",
                              disabled && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
                              activeItem ? "bg-command-teal/20 text-command-teal dark:text-command-teal" : "text-blue-700 dark:text-white/80 group-hover:text-blue-900 dark:group-hover:text-white"
                            )}>
                              {icon}
                            </div>
                            <span className="text-sm font-medium">{label}</span>
                            {disabled && (
                              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-white/10 dark:text-white/70">
                                Soon
                              </span>
                            )}
                            {activeItem && (
                              <motion.div 
                                className="absolute left-0 top-0 h-full w-1 bg-command-teal rounded-r-full"
                                layoutId="mobileActiveIndicator"
                              />
                            )}
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                
                {/* User Profile Section - Mobile */}
                <UserProfileSection isExpanded={true} onNavigate={handleNavigation} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 