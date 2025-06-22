import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/inputs/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: t.landingPage.navbar.home, href: "#home" },
    { name: t.landingPage.navbar.features, href: "#features" },
    { name: t.landingPage.navbar.about, href: "#about" },
    { name: t.landingPage.navbar.demo, href: "#ai-demo" },
    { name: t.landingPage.navbar.engine, href: "#ai-engine" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/Smart_service_logo.png" 
              alt="Smart Service" 
              className="h-10 w-10 object-contain navbar-logo navbar-logo-pulse"
            />
            <span className={`text-xl font-bold ${
              scrolled 
                ? 'text-[#0A1F44] dark:text-white' 
                : 'text-white'
              } transition-colors duration-300`}>
              Smart Service
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${
                  scrolled 
                    ? 'text-gray-700 dark:text-gray-200' 
                    : 'text-white'
                } hover:text-[#3AA1FF] transition-colors duration-300 font-medium relative group`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3AA1FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Language Selector */}
            <div className="ml-2">
              <LanguageSelector />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" className="border-[#3AA1FF] text-[#3AA1FF] hover:bg-[#3AA1FF] hover:text-white">
              <Link to="/auth?mode=login">{t.landingPage.navbar.login}</Link>
            </Button>
            <Button asChild className="bg-[#3AA1FF] hover:bg-[#2a90ef] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(58,161,255,0.5)] transition-all duration-300 hover:scale-105">
              <Link to="/auth?mode=register">{t.landingPage.navbar.signup}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <LanguageSelector variant="minimal" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`ml-2 ${
                scrolled 
                  ? 'text-[#0A1F44] dark:text-white' 
                  : 'text-white'
              } hover:text-[#3AA1FF] transition-colors`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white dark:bg-gray-800 backdrop-blur-lg rounded-xl shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-[#3AA1FF] transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <Button variant="outline" className="border-[#3AA1FF] text-[#3AA1FF] hover:bg-[#3AA1FF] hover:text-white w-full">
                  {t.landingPage.navbar.login}
                </Button>
                <Button className="bg-[#3AA1FF] hover:bg-[#2a90ef] text-white px-6 py-2 rounded-full font-semibold w-full">
                  {t.landingPage.navbar.signup}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
