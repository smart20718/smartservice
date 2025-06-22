import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingInput } from '@/components/ui/inputs/FloatingInput';
import { Button } from '@/components/ui/inputs/button';
import { Eye, EyeOff, LogIn, Mail, User, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('Login successful:', data);
      // Begin redirect UX to workspace
      setRedirecting(true);
      // Delay to allow UI update then navigate
      setTimeout(() => {
        navigate('/workspace');
      }, 1500);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  // Staggered animation for form elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.form 
      className="auth-form"
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Email field */}
      <motion.div className="form-group" variants={itemVariants}>
        <FloatingInput 
          label={t.auth.login.email} 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={20} />} 
        />
      </motion.div>
      
      {/* Password field */}
      <motion.div className="form-group" variants={itemVariants}>
        <label htmlFor="password" className="form-label">{t.auth.login.password}</label>
        <div className="input-container">
        <div className="password-input-container">
            <FloatingInput 
              label="Password" 
              type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
              {showPassword ? <EyeOff size={18} className="eye-icon" /> : <Eye size={18} className="eye-icon" />}
          </button>
          </div>
        </div>
      </motion.div>
      
      {/* Error message */}
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
      
      {/* Forgot password link */}
      <motion.div className="forgot-password-container" variants={itemVariants}>
        <a href="#forgot-password" className="forgot-password-link">
          Forgot Password?
        </a>
      </motion.div>
      
      {/* Login button */}
      <motion.div className="button-container" variants={itemVariants}>
        <Button 
          type="submit" 
          className="auth-submit-button"
          disabled={loading || redirecting}
        >
          {redirecting ? (
            <>
              <LogIn size={18} className="animate-spin" />
              <span>🔄 Redirecting to your workspace...</span>
            </>
          ) : loading ? (
            <div className="spinner"></div>
          ) : (
            <>
              <LogIn size={18} className="login-icon" />
              <span>{t.auth.login.submit}</span>
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm; 