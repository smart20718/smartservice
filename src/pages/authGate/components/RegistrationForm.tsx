import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingInput } from '@/components/ui/inputs/FloatingInput';
import { Button } from '@/components/ui/inputs/button';
import { Eye, EyeOff, UserPlus, Check, X, AlertCircle, User, Mail, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-3: weak, medium, strong, very strong
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  
  const navigate = useNavigate();

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordFeedback('');
      return;
    }

    let strength = 0;
    const feedbacks = [];

    // Length check
    if (password.length >= 8) {
      strength += 1;
    } else {
      feedbacks.push('Use at least 8 characters');
    }

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    else feedbacks.push('Add uppercase letters');
    
    if (/[0-9]/.test(password)) strength += 1;
    else feedbacks.push('Add numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else feedbacks.push('Add special characters');

    // Set strength (normalized to 0-3)
    setPasswordStrength(Math.min(3, Math.floor(strength * 0.75)));
    
    // Set feedback (show only first 2 issues)
    setPasswordFeedback(feedbacks.slice(0, 2).join(', '));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (passwordStrength < 1) {
      setError("Password is too weak");
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      
      if (signUpError) {
        const msg = signUpError.message?.toLowerCase() || '';
        if (msg.includes('already') && msg.includes('registered')) {
          setError('This email is already in use.');
        } else if (msg.includes('duplicate') || msg.includes('exists')) {
          setError('This email is already in use.');
        } else if (msg.includes('for security purposes')) {
          // extract seconds
          const match = msg.match(/after (\d+) seconds?/);
          if (match && match[1]) {
            const sec = parseInt(match[1], 10);
            setCooldown(sec);
            // Don't set error message for cooldown, as we show it in the button
          } else {
            setError(signUpError.message);
          }
        } else {
          setError(signUpError.message || 'Failed to create account');
        }
        return;
      }
      
      // Check if the user was actually created (identities length 0 means duplicate with different provider)
      if (data?.user && data.user.identities?.length === 0) {
        setError('This email is already in use.');
        return;
      }
      
      console.log('Registration successful:', data);
      setRedirecting(true);
      setTimeout(() => {
        navigate('/workspace');
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  // Cooldown countdown effect
  useEffect(() => {
    if (cooldown === null) return;
    if (cooldown <= 0) {
      setCooldown(null);
      return;
    }
    const timer = setTimeout(() => setCooldown((prev) => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Get strength indicator label and color
  const getStrengthInfo = () => {
    const labels = ['Weak', 'Medium', 'Strong', 'Very Strong'];
    const colors = ['#ff4d4f', '#faad14', '#52c41a', '#0EF5E0'];
    return {
      label: labels[passwordStrength],
      color: colors[passwordStrength]
    };
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

  // Password strength animation variants
  const strengthBarVariants = {
    initial: { width: 0 },
    animate: (strength: number) => ({
      width: `${(strength + 1) * 25}%`,
      transition: { duration: 0.3 }
    })
  };

  return (
    <motion.form 
      className="auth-form"
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Username field */}
      <motion.div className="form-group" variants={itemVariants}>
        <div className="input-container">
          <FloatingInput 
            label="Username" 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
            icon={<User size={20} />} 
        />
        </div>
      </motion.div>
      
      {/* Email field */}
      <motion.div className="form-group" variants={itemVariants}>
        <div className="input-container">
          <FloatingInput 
            label="Email" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={20} />} 
        />
        </div>
      </motion.div>
      
      {/* Password field */}
      <motion.div className="form-group" variants={itemVariants}>
        <div className="input-container">
        <div className="password-input-container">
            <FloatingInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              icon={<Shield size={20} />} 
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
        
        {/* Password strength meter */}
        {password && (
          <motion.div 
            className="password-strength-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="strength-meter-container">
              <motion.div 
                className="strength-meter-bar"
                custom={passwordStrength}
                variants={strengthBarVariants}
                initial="initial"
                animate="animate"
                style={{ 
                  backgroundColor: getStrengthInfo().color
                }}
              />
            </div>
            <div className="strength-text">
              <span>
                {passwordStrength > 0 ? 
                  <Check size={16} className="strength-icon" style={{ color: getStrengthInfo().color }} /> : 
                  <AlertCircle size={16} className="strength-icon" style={{ color: getStrengthInfo().color }} />
                }
              </span>
              <span className="strength-label" style={{ color: getStrengthInfo().color }}>
                {getStrengthInfo().label}
              </span>
              {passwordFeedback && (
                <span className="strength-feedback">: {passwordFeedback}</span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Confirm Password field */}
      <motion.div className="form-group" variants={itemVariants}>
        <div className="input-container">
        <div className="password-input-container">
            <FloatingInput
              label="Confirm password"
              type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Shield size={20} />} 
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
              {showConfirmPassword ? <EyeOff size={18} className="eye-icon" /> : <Eye size={18} className="eye-icon" />}
          </button>
          </div>
        </div>
        
        {/* Password match indicator */}
        {confirmPassword && (
          <motion.div 
            className="password-match"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {password === confirmPassword ? (
              <div className="match-success">
                <Check size={16} className="match-icon" />
                <span>Passwords match</span>
              </div>
            ) : (
              <div className="match-error">
                <X size={16} className="match-icon" />
                <span>Passwords don't match</span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
      
      {/* Error message - hidden during cooldown to avoid red box */}
      {error && cooldown === null && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
      
      {/* Submit button */}
      <motion.div className="button-container" variants={itemVariants}>
        <Button 
          type="submit" 
          className="auth-submit-button"
          disabled={password !== confirmPassword || passwordStrength < 1 || loading || cooldown !== null || redirecting}
        >
          {redirecting ? (
            <>
              <UserPlus size={18} className="animate-spin" />
              <span>🔄 Redirecting to your workspace...</span>
            </>
          ) : loading ? (
            <div className="spinner"></div>
          ) : (
            <>
              {cooldown === null ? (
                <>
                  <UserPlus size={18} className="register-icon" />
                  <span>Create Secure Access</span>
                </>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Retry in
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={cooldown}
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {cooldown}s
                    </motion.span>
                  </AnimatePresence>
                </span>
              )}
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default RegistrationForm; 