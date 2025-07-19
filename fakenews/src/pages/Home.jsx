import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertTriangle, TrendingUp, Users, Globe, Zap, ArrowRight, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    articlesAnalyzed: 0,
    fakeNewsDetected: 0,
    activeUsers: 0,
    accuracyRate: 0
  });

  useEffect(() => {
    // Animate stats on load
    const timer = setTimeout(() => {
      setStats({
        articlesAnalyzed: 125847,
        fakeNewsDetected: 23156,
        activeUsers: 15420,
        accuracyRate: 94.7
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze news content for authenticity and credibility in real-time.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Real-time Verification",
      description: "Instant fact-checking with comprehensive credibility scores and detailed explanations.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global News Coverage",
      description: "Monitor and verify news from thousands of sources worldwide across multiple languages.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Trending Analysis",
      description: "Track viral news stories and identify misinformation before it spreads widely.",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Journalist",
      content: "TruthGuard has revolutionized how I verify sources. It's become an essential tool in my daily workflow.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Media Researcher",
      content: "The AI analysis is incredibly accurate. It's helped our research team identify misinformation patterns.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "News Editor",
      content: "Finally, a reliable tool for fact-checking. The detailed reports save us hours of manual verification.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Shield className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm font-medium">AI-Powered News Verification</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Fight{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Fake News
                </span>{' '}
                with AI
              </h1>
              
              <p className="text-xl lg:text-2xl text-purple-100 mb-8 leading-relaxed">
                Verify news authenticity instantly with our advanced AI technology. 
                Get credibility scores, fact-checks, and detailed analysis in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/verify')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                >
                  <span>Start Verifying</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="absolute -top-4 -right-4 bg-green-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                  94.7% Accurate
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Credibility Score</span>
                    <span className="text-2xl font-bold text-green-400">87%</span>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '87%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                    ></motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-4">
                      <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <div className="text-sm text-purple-200">Verified Claims</div>
                      <div className="text-xl font-bold">12</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-sm text-purple-200">Red Flags</div>
                      <div className="text-xl font-bold">2</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Articles Analyzed", value: stats.articlesAnalyzed.toLocaleString(), icon: <Globe className="h-8 w-8" />, color: "text-blue-600" },
              { label: "Fake News Detected", value: stats.fakeNewsDetected.toLocaleString(), icon: <Shield className="h-8 w-8" />, color: "text-red-600" },
              { label: "Active Users", value: stats.activeUsers.toLocaleString(), icon: <Users className="h-8 w-8" />, color: "text-green-600" },
              { label: "Accuracy Rate", value: `${stats.accuracyRate}%`, icon: <TrendingUp className="h-8 w-8" />, color: "text-purple-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                News Verification
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology provides comprehensive analysis and verification 
              tools to help you identify misinformation and stay informed.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with news verification in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Submit Content",
                description: "Paste a news article URL or text content that you want to verify for authenticity.",
                icon: "📝"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our advanced AI analyzes the content using multiple verification methods and credible sources.",
                icon: "🤖"
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive detailed analysis with credibility scores, fact-checks, and supporting evidence.",
                icon: "📊"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-purple-300 mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what journalists, researchers, and media professionals say about TruthGuard
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Fight Misinformation?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust TruthGuard to verify news and combat fake information.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/verify')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-xl text-xl font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center"
            >
              <span>Start Verifying Now</span>
              <ArrowRight className="ml-3 h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;