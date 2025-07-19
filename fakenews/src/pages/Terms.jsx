import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle, Users, Globe } from 'lucide-react';
import SEO from '../components/SEO';

const Terms = () => {
  const sections = [
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "Provide accurate information when creating an account",
        "Use the service only for legitimate news verification purposes",
        "Respect intellectual property rights of content creators",
        "Do not attempt to manipulate or game our AI systems",
        "Report any bugs or security vulnerabilities responsibly"
      ]
    },
    {
      icon: Globe,
      title: "Service Usage",
      content: [
        "TruthGuard is provided for informational purposes only",
        "AI analysis results should be used as guidance, not absolute truth",
        "We reserve the right to limit usage to prevent abuse",
        "Service availability may vary and is not guaranteed 24/7",
        "We may update or modify features with reasonable notice"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "Attempting to reverse engineer our AI algorithms",
        "Using the service to spread misinformation",
        "Violating any applicable laws or regulations",
        "Harassing other users or our support team",
        "Creating multiple accounts to circumvent limitations"
      ]
    },
    {
      icon: CheckCircle,
      title: "Intellectual Property",
      content: [
        "TruthGuard owns all rights to our platform and technology",
        "Users retain rights to content they submit for analysis",
        "We may use aggregated, anonymized data for research",
        "Respect third-party content and fair use principles",
        "Report any copyright infringement to our team"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Terms of Service - TruthGuard"
        description="Read TruthGuard's terms of service to understand your rights and responsibilities when using our AI-powered news verification platform."
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
                <Scale className="h-5 w-5 mr-2" />
                <span className="font-semibold">Legal Terms</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Terms of Service
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These terms govern your use of TruthGuard and outline the rights and 
                responsibilities of both users and our platform.
              </p>
              
              <div className="mt-6 text-sm text-gray-500">
                Last updated: January 15, 2025
              </div>
            </motion.div>

            {/* Acceptance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using TruthGuard, you agree to be bound by these Terms of Service 
                and our Privacy Policy. If you do not agree to these terms, please do not use our 
                service. These terms apply to all users, including visitors, registered users, and 
                premium subscribers.
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

            {/* Disclaimers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 rounded-2xl p-8 mt-8 border border-yellow-200"
            >
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Important Disclaimers</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>AI Limitations:</strong> Our AI analysis is designed to assist in news 
                  verification but is not infallible. Always use critical thinking and consult 
                  multiple sources when evaluating news content.
                </p>
                
                <p>
                  <strong>No Warranty:</strong> TruthGuard is provided "as is" without warranties 
                  of any kind. We do not guarantee the accuracy, completeness, or reliability of 
                  our analysis results.
                </p>
                
                <p>
                  <strong>Limitation of Liability:</strong> TruthGuard shall not be liable for any 
                  indirect, incidental, special, or consequential damages arising from your use of 
                  our service.
                </p>
              </div>
            </motion.div>

            {/* Account Terms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-8 mt-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Terms</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Account Creation</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Must be 13 years or older</li>
                    <li>• Provide accurate information</li>
                    <li>• One account per person</li>
                    <li>• Keep login credentials secure</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Account Termination</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• You may delete your account anytime</li>
                    <li>• We may suspend accounts for violations</li>
                    <li>• Data retention per privacy policy</li>
                    <li>• No refunds for premium features</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Changes and Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mt-8 border border-purple-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
              
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes via email or through our platform. Continued use of TruthGuard 
                after changes constitutes acceptance of the new terms.
              </p>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Questions About These Terms?</h3>
                <p className="text-gray-700 mb-3">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-1 text-gray-700">
                  <p><strong>Email:</strong> legal@truthguard.com</p>
                  <p><strong>Address:</strong> Near Tahsil Hingna, Maharashtra, India</p>
                </div>
              </div>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-50 rounded-2xl p-8 mt-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These terms are governed by the laws of India. Any disputes arising from these 
                terms or your use of TruthGuard will be resolved in the courts of Maharashtra, India. 
                We encourage users to contact us directly to resolve any issues before pursuing 
                legal action.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;