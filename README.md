TruthGuard - AI-Powered News Verification Platform
TruthGuard is a comprehensive news verification platform that uses Google's Gemini AI to detect fake news and assess content credibility in real-time.

Features
AI-Powered Analysis: Uses Google Gemini AI for sophisticated content analysis
URL & Text Analysis: Verify news from URLs or analyze text content directly
Credibility Scoring: Get detailed credibility scores with explanations
Fact-Checking: Comprehensive claim analysis with evidence
Real-time Results: Instant analysis with detailed breakdowns
User-Friendly Interface: Clean, intuitive design for easy navigation
Setup Instructions
1. Clone and Install Dependencies
git clone <repository-url>
cd truthguard
npm install
2. Configure Gemini API
Get your Gemini API key from Google AI Studio
Get your GNews API key from GNews.io
Add your API keys to the .env file:
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
Add your GNews API key to the server/.env file:
GNEWS_API_KEY=your_actual_gnews_api_key_here
3. Start the Development Server
npm run dev:full
The application will be available at http://localhost:5173 with the backend API running on http://localhost:5000

How to Use
News Verification
Navigate to Verify Page: Click "Verify News" in the navigation
Choose Input Method:
URL Analysis: Enter a news article URL
Text Analysis: Paste news content directly
Analyze: Click "Verify Content" to start the AI analysis
Review Results: Get comprehensive analysis including:
Credibility score (0-100%)
Detailed explanation
Key points and quotes
Fact-check analysis
Red flags and positive indicators
Final verdict
Features Overview
Trending News: View analyzed trending news articles
Analysis History: Track your previous analyses (demo data)
About: Learn more about the platform and contact information
AI Chatbot: Get help with news verification questions
Technical Architecture
Frontend
React 18 with modern hooks
Tailwind CSS for styling
React Router for navigation
Lucide React for icons
AI Integration
Google Gemini AI for content analysis
Custom analysis engine with fallback mechanisms
Content extraction from URLs
Structured analysis output
Analysis Components
Content Extraction: Automatically extracts content from news URLs
AI Analysis: Uses Gemini AI to analyze content for:
Source credibility
Factual accuracy
Writing quality
Bias detection
Sensationalism indicators
Scoring Algorithm: Comprehensive credibility scoring
Evidence Gathering: Provides supporting evidence for verdicts
API Configuration
The application requires a Gemini API key to function. Without it, the system will fall back to basic analysis.

Getting a Gemini API Key
Visit Google AI Studio
Sign in with your Google account
Create a new API key
Copy the key to your .env file
Environment Variables
# Required for AI analysis
VITE_GEMINI_API_KEY=your_gemini_api_key

# Supabase (for future features)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Development
Project Structure
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── lib/                # Utility libraries and API clients
├── store/              # State management
└── styles/             # Global styles

lib/
├── gemini.js           # Gemini AI integration
└── supabase.js         # Database client
Key Components
NewsAnalyzer: Core AI analysis engine
Verify Page: Main verification interface
Chatbot: AI-powered help assistant
Trending: Curated news analysis
Deployment
Build the application:
npm run build
Deploy the dist folder to your hosting platform

Ensure environment variables are configured in production

Contributing
Fork the repository
Create a feature branch
Make your changes
Test thoroughly
Submit a pull request
License
MIT License - see LICENSE file for details

Support
For support or questions:

Email: support@truthguard.com
GitHub Issues: Create an issue in this repository
Note: This application requires a valid Gemini API key for full functionality. The basic analysis will work without the API key, but AI-powered features require proper configuration.
