import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Account information (email, name, profile details)",
        "News articles and content you analyze",
        "Usage data and analytics",
        "Device and browser information",
        "Cookies and similar technologies"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our news verification services",
        "Analyze trends and patterns in misinformation",
        "Send you notifications and updates",
        "Ensure platform security and prevent abuse",
        "Comply with legal obligations"
      ]
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        "We do not sell your personal information",
        "Anonymous, aggregated data may be shared for research",
        "Service providers who help us operate the platform",
        "Legal authorities when required by law",
        "With your explicit consent for specific purposes"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers with regular security audits",
        "Access controls and authentication measures",
        "Regular backups and disaster recovery procedures",
        "Employee training on data protection"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy - TruthGuard"
        description="Learn how TruthGuard protects your privacy and handles your personal information. Our commitment to data security and transparency."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full mb-6">
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-semibold">Privacy & Security</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Privacy Policy
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your information when you use TruthGuard.
              </p>
              
              <div className="mt-6 text-sm text-gray-500">
                Last updated: January 15, 2025
              </div>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At TruthGuard, we believe that privacy is a fundamental right. We are committed to 
                being transparent about how we collect, use, and share your information. This privacy 
                policy applies to all services provided by TruthGuard, including our website, mobile 
                applications, and any related services.
              </p>
            </motion.div>

            {/* Main Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mt-8 border border-purple-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Access and Control</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Access your personal information</li>
                    <li>• Update or correct your data</li>
                    <li>• Delete your account and data</li>
                    <li>• Export your data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Privacy Controls</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Manage notification preferences</li>
                    <li>• Control data sharing settings</li>
                    <li>• Opt out of analytics</li>
                    <li>• Manage cookie preferences</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-8 mt-8"
            >
              <div className="flex items-center mb-6">
                <Mail className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our data practices, 
                please don't hesitate to contact us:
              </p>
              
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@truthguard.com</p>
                <p><strong>Address:</strong> Near Tahsil Hingna, Maharashtra, India</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-yellow-50 rounded-2xl p-8 mt-8 border border-yellow-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time to reflect changes in our 
                practices or for other operational, legal, or regulatory reasons. We will notify 
                you of any material changes by posting the new policy on this page and updating 
                the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;