import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import HomeSection from "./sections/HomeSection";
import ChatbotInterfaceSection from "./sections/ChatbotInterfaceSection";
import SettingsSection from "./sections/SettingsSection";

const Workspace = () => {
  const [activeSection, setActiveSection] = useState<"home" | "chat" | "settings">("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDarkMode = document.documentElement.classList.contains("dark");
          setTheme(isDarkMode ? "dark" : "light");
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (section: "home" | "chat" | "settings") => {
    setActiveSection(section);
    setSidebarOpen(false); // close drawer on mobile
  };

  // Determine padding classes based on section
  const mainPaddingCls =
    activeSection === "chat"
      ? "flex-1 overflow-y-auto"
      : "flex-1 overflow-y-auto pt-16 md:pt-6 px-4 md:px-10 py-6 md:py-10";

  return (
    <div className={`${theme === "dark" ? "command-center" : ""} h-screen w-full flex overflow-hidden starfield`}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        active={activeSection}
        onNavigate={handleNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className={mainPaddingCls}>
        {activeSection === "home" && <HomeSection onNavigate={handleNavigate} />}
        {activeSection === "chat" && <ChatbotInterfaceSection />}
        {activeSection === "settings" && <SettingsSection />}
      </main>
    </div>
  );
};

export default Workspace; 