import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...', variant = 'default' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variants = {
    default: {
      bg: 'bg-purple-600',
      text: 'text-gray-600'
    },
    light: {
      bg: 'bg-white',
      text: 'text-white'
    },
    dark: {
      bg: 'bg-gray-800',
      text: 'text-gray-300'
    }
  };

  const currentVariant = variants[variant] || variants.default;

  if (variant === 'page') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="relative mx-auto mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            TruthGuard
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            {message}
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full max-w-xs mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} ${currentVariant.bg} rounded-full flex items-center justify-center`}
      >
        <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} text-white`} />
      </motion.div>
      
      {message && (
        <span className={`${currentVariant.text} font-medium`}>
          {message}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;