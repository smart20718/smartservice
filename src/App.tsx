import { Toaster } from "@/components/ui/feedback/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/feedback/sonner";
import { TooltipProvider } from "@/components/ui/overlays/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthGate from "./pages/authGate";
import Workspace from "./pages/workspace";
import { UserProfileProvider } from "@/user-profile/UserProfileContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import React, { useEffect } from 'react';

const queryClient = new QueryClient();

const App = () => {
  // sync theme on initial load and when storage changes
  useEffect(() => {
    const apply = () => {
      const theme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    apply();
    const handler = (e: StorageEvent) => {
      if (e.key === 'theme') {
        apply();
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <UserProfileProvider>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthGate />} />
              <Route path="/workspace/*" element={<Workspace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProfileProvider>
    </LanguageProvider>
  </QueryClientProvider>
);
};

export default App;
