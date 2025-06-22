import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

const AuthCard: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const startMode = query.get('mode') === 'login';
  const [isLogin, setIsLogin] = useState(startMode);
  const { t } = useLanguage();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <motion.div 
      className="auth-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
    >
      {/* Glowing edge effect */}
      <div className="auth-card-glow"></div>
      
      {/* Card Header */}
      <div className="auth-card-header">
        <motion.h1 className="auth-title">
          {isLogin ? t.auth.login.title : t.auth.register.title}
        </motion.h1>
        <motion.p className="auth-subtitle">
          {isLogin ? t.auth.login.switch : t.auth.register.switch}
        </motion.p>
      </div>

      {/* Card Content with animated switching */}
      <div className="auth-card-content">
        <AnimatePresence mode='wait'>
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ 
              opacity: 0, 
              x: isLogin ? -20 : 20
            }}
            animate={{ 
              opacity: 1,
              x: 0 
            }}
            exit={{ 
              opacity: 0,
              x: isLogin ? 20 : -20
            }}
            transition={{ duration: 0.3 }}
            className="auth-form-container"
          >
            {isLogin ? <LoginForm /> : <RegistrationForm />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Form toggle */}
      <motion.div className="auth-toggle">
        <p className="toggle-text">
          {isLogin ? t.auth.login.switch : t.auth.register.switch}
        </p>
        <motion.button
          className="toggle-button"
          onClick={toggleForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLogin ? t.auth.register.submit : t.auth.login.submit}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AuthCard; 