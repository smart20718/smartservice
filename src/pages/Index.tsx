import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import DialogSection from "@/components/DialogSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import AIEngineSection from "@/components/AIEngineSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <DialogSection />
      <AnalyticsSection />
      <AIEngineSection />
    </div>
  );
};

export default Index;
