import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';
import AuthCard from './components/AuthCard';
import './styles/AuthGate.css';

const AuthGate: React.FC = () => {
  return (
    <div className="auth-gate-container">
      {/* Background effects */}
      <BackgroundEffects />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <motion.div 
        className="auth-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AuthCard />
      </motion.div>
    </div>
  );
};

export default AuthGate; 