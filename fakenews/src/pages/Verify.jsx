import React, { useState } from 'react';
import { Search, Link2, FileText, AlertTriangle, CheckCircle, ExternalLink, BookOpen, Shield, Loader, Zap, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsAnalyzer } from '../lib/gemini';
import { useHistoryStore } from '../store/history';
import ShareButton from '../components/ShareButton';
import BookmarkButton from '../components/BookmarkButton';
import toast from 'react-hot-toast';

const Verify = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { addAnalysis } = useHistoryStore();

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast.error('Please enter a URL or text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      let analysisData;
      
      if (activeTab === 'url') {
        try {
          new URL(input);
        } catch {
          throw new Error('Please enter a valid URL');
        }

        const extracted = await newsAnalyzer.extractContentFromUrl(input);
        analysisData = await newsAnalyzer.analyzeNews(extracted.content, input);
      } else {
        analysisData = await newsAnalyzer.analyzeNews(input);
      }

      setAnalysisProgress(100);
      setTimeout(() => {
        setAnalysisResult(analysisData);
        addAnalysis({
          ...analysisData,
          inputType: activeTab,
          originalInput: input
        });
        toast.success('Analysis completed successfully!');
      }, 500);

    } catch (error) {
      console.error('Analysis failed:', error);
      
      let errorMessage = 'Failed to analyze the content. ';
      
      if (error.message.includes('API key')) {
        errorMessage += 'Please ensure your Gemini API key is properly configured.';
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage += 'API quota exceeded. Please try again later.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage += 'Network error. Please check your internet connection.';
      } else {
        errorMessage += 'Please try again or contact support if the issue persists.';
      }
      
      toast.error(errorMessage);
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-cyan-600';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Highly Credible';
    if (score >= 60) return 'Credible';
    if (score >= 40) return 'Questionable';
    return 'Unreliable';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full mb-6">
              <Zap className="h-5 w-5 mr-2" />
              <span className="font-semibold">AI-Powered News Verification</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Verify News with{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Precision
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter a news article URL or paste content to get instant credibility analysis, 
              fact-checking, and detailed verification reports powered by advanced AI.
            </p>
          </motion.div>

          {/* Analysis Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100"
          >
            {/* Tab Selector */}
            <div className="flex space-x-2 mb-8 bg-gray-100 p-2 rounded-2xl">
              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 font-semibold ${
                  activeTab === 'url'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                <Link2 className="h-5 w-5 mr-2" />
                URL Analysis
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 font-semibold ${
                  activeTab === 'text'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                <FileText className="h-5 w-5 mr-2" />
                Text Analysis
              </button>
            </div>

            {/* Input Section */}
            <div className="mb-8">
              {activeTab === 'url' ? (
                <div className="relative">
                  <input
                    type="url"
                    placeholder="Enter news article URL (e.g., https://example.com/news-article)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 pr-16"
                  />
                  <Link2 className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    placeholder="Paste news article text here for comprehensive AI analysis..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-48 px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none"
                  />
                  <FileText className="absolute right-6 top-6 h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="h-6 w-6 mr-3 animate-spin" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  <Target className="h-6 w-6 mr-3" />
                  Verify Content with AI
                </>
              )}
            </motion.button>

            {/* Progress Bar */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                    />
                  </div>
                  <p className="text-center text-gray-600 mt-2 font-medium">
                    {analysisProgress < 30 && "Extracting content..."}
                    {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing credibility..."}
                    {analysisProgress >= 60 && analysisProgress < 90 && "Fact-checking claims..."}
                    {analysisProgress >= 90 && "Finalizing report..."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Analysis Results */}
          <AnimatePresence>
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
              >
                {/* Results Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{analysisResult.title}</h2>
                      <p className="text-gray-600">{analysisResult.url}</p>
                    </div>
                    
                    {/* Credibility Score */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getScoreColor(analysisResult.credibilityScore)} text-white text-2xl font-bold shadow-lg`}>
                          {analysisResult.credibilityScore}%
                        </div>
                        <div className="mt-2 font-semibold text-gray-700">
                          {getScoreLabel(analysisResult.credibilityScore)}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {analysisResult.credibilityScore >= 70 ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                      AI Analysis Summary
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{analysisResult.summary}</p>
                  </motion.div>

                  {/* Key Points */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="h-6 w-6 mr-3 text-purple-600" />
                      Key Analysis Points
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysisResult.keyPoints.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100"
                        >
                          <Shield className="h-5 w-5 mr-3 text-purple-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quotes */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Notable Quotes</h3>
                    <div className="space-y-4">
                      {analysisResult.quotes.map((quote, index) => (
                        <motion.blockquote
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-xl italic text-gray-700 text-lg"
                        >
                          "{quote}"
                        </motion.blockquote>
                      ))}
                    </div>
                  </motion.div>

                  {/* Claims Analysis */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Fact-Check Analysis</h3>
                    <div className="space-y-6">
                      {analysisResult.claims.map((claim, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="bg-gray-50 p-6 rounded-2xl border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <p className="font-semibold text-gray-900 flex-1 mr-4">
                              <span className="text-purple-600">Claim:</span> {claim.claim}
                            </p>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                              claim.verdict === 'TRUE' ? 'bg-green-100 text-green-800' :
                              claim.verdict === 'MISLEADING' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {claim.verdict}
                            </span>
                          </div>
                          <p className="text-gray-700">
                            <span className="font-semibold text-gray-900">Evidence:</span> {claim.evidence}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Red Flags and Positive Indicators */}
                  {(analysisResult.redFlags?.length > 0 || analysisResult.positiveIndicators?.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="grid md:grid-cols-2 gap-8"
                    >
                      {analysisResult.redFlags?.length > 0 && (
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                          <h4 className="font-bold text-red-800 mb-4 flex items-center text-lg">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Warning Signs
                          </h4>
                          <ul className="space-y-2">
                            {analysisResult.redFlags.map((flag, index) => (
                              <li key={index} className="text-red-700 flex items-start">
                                <span className="text-red-500 mr-2 mt-1">•</span>
                                {flag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {analysisResult.positiveIndicators?.length > 0 && (
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                          <h4 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Credibility Indicators
                          </h4>
                          <ul className="space-y-2">
                            {analysisResult.positiveIndicators.map((indicator, index) => (
                              <li key={index} className="text-green-700 flex items-start">
                                <span className="text-green-500 mr-2 mt-1">•</span>
                                {indicator}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Verification Sources */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Verification Sources</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysisResult.verificationSources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
                        >
                          <ExternalLink className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">{source.name}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Final Verdict */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="border-t border-gray-200 pt-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Final Verdict</h3>
                    <div className={`p-6 rounded-2xl border-2 ${
                      analysisResult.credibilityScore >= 70 ? 'bg-green-50 border-green-200' :
                      analysisResult.credibilityScore >= 40 ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <p className={`text-lg font-medium leading-relaxed ${
                        analysisResult.credibilityScore >= 70 ? 'text-green-800' :
                        analysisResult.credibilityScore >= 40 ? 'text-yellow-800' :
                        'text-red-800'
                      }`}>
                        {analysisResult.finalVerdict}
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                      <BookmarkButton 
                        article={{
                          id: Date.now().toString(),
                          title: analysisResult.title,
                          description: analysisResult.summary,
                          url: analysisResult.url,
                          credibilityScore: analysisResult.credibilityScore,
                          category: 'analysis'
                        }} 
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                      />
                      <ShareButton 
                        article={{
                          title: analysisResult.title,
                          url: analysisResult.url,
                          description: analysisResult.summary
                        }}
                        analysis={analysisResult}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Verify;