import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      className="auth-navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="auth-navbar-container">
        <motion.div 
          className="logo-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className="logo-link">
            <img 
              src="/Smart_service_logo.png" 
              alt="Smart Service" 
              className="logo-image"
            />
            <span className="logo-text">Smart Service</span>
          </Link>
        </motion.div>
        
        <motion.div
          className="back-link-container"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 