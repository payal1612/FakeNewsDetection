import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, MapPin, Phone, Github, Linkedin, Twitter, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Shield className="h-10 w-10 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  TruthGuard
                </span>
                <div className="text-sm text-purple-200 font-medium">AI News Verification</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Your trusted AI-powered platform for detecting and verifying fake news in real-time.
              We help you make informed decisions with fact-based analysis and comprehensive verification.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/truthguard"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/truthguard"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/truthguard"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/truthguard"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/verify" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🔍</span>
                  News Verification
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🔥</span>
                  Trending News
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📊</span>
                  Analysis History
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📈</span>
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">ℹ️</span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact & Support</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span>Near Tahsil Hingna, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-purple-400" />
                <a href="mailto:payalambule7@gmail.com" className="hover:text-white transition-colors">
                  payalambule7@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-purple-400" />
                <span>+91 7798124163</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Developer</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.linkedin.com/in/payal-ambule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/payal-ambule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>&copy; {currentYear} TruthGuard. All rights reserved.</span>
              <Heart className="h-4 w-4 mx-2 text-red-400" />
              <span>Made with passion for truth</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;