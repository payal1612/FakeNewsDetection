# TruthGuard - AI-Powered News Verification Platform

TruthGuard is a comprehensive news verification platform that uses Google's Gemini AI to detect fake news and assess content credibility in real-time.

## Features

- **AI-Powered Analysis**: Uses Google Gemini AI for sophisticated content analysis
- **URL & Text Analysis**: Verify news from URLs or analyze text content directly
- **Credibility Scoring**: Get detailed credibility scores with explanations
- **Fact-Checking**: Comprehensive claim analysis with evidence
- **Real-time Results**: Instant analysis with detailed breakdowns
- **User-Friendly Interface**: Clean, intuitive design for easy navigation

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd truthguard
npm install
```

### 2. Configure Gemini API

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Get your GNews API key from [GNews.io](https://gnews.io/)
3. Add your API keys to the `.env` file:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

4. Add your GNews API key to the `server/.env` file:

```env
GNEWS_API_KEY=your_actual_gnews_api_key_here
```

### 3. Start the Development Server

```bash
npm run dev:full
```

The application will be available at `http://localhost:5173` with the backend API running on `http://localhost:5000`

## How to Use

### News Verification

1. **Navigate to Verify Page**: Click "Verify News" in the navigation
2. **Choose Input Method**: 
   - **URL Analysis**: Enter a news article URL
   - **Text Analysis**: Paste news content directly
3. **Analyze**: Click "Verify Content" to start the AI analysis
4. **Review Results**: Get comprehensive analysis including:
   - Credibility score (0-100%)
   - Detailed explanation
   - Key points and quotes
   - Fact-check analysis
   - Red flags and positive indicators
   - Final verdict

### Features Overview

- **Trending News**: View analyzed trending news articles
- **Analysis History**: Track your previous analyses (demo data)
- **About**: Learn more about the platform and contact information
- **AI Chatbot**: Get help with news verification questions

## Technical Architecture

### Frontend
- **React 18** with modern hooks
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### AI Integration
- **Google Gemini AI** for content analysis
- **Custom analysis engine** with fallback mechanisms
- **Content extraction** from URLs
- **Structured analysis output**

### Analysis Components

1. **Content Extraction**: Automatically extracts content from news URLs
2. **AI Analysis**: Uses Gemini AI to analyze content for:
   - Source credibility
   - Factual accuracy
   - Writing quality
   - Bias detection
   - Sensationalism indicators
3. **Scoring Algorithm**: Comprehensive credibility scoring
4. **Evidence Gathering**: Provides supporting evidence for verdicts

## API Configuration

The application requires a Gemini API key to function. Without it, the system will fall back to basic analysis.

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

### Environment Variables

```env
# Required for AI analysis
VITE_GEMINI_API_KEY=your_gemini_api_key

# Supabase (for future features)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── lib/                # Utility libraries and API clients
├── store/              # State management
└── styles/             # Global styles

lib/
├── gemini.js           # Gemini AI integration
└── supabase.js         # Database client
```

### Key Components

- **NewsAnalyzer**: Core AI analysis engine
- **Verify Page**: Main verification interface
- **Chatbot**: AI-powered help assistant
- **Trending**: Curated news analysis

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

3. Ensure environment variables are configured in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions:
- Email: support@truthguard.com
- GitHub Issues: Create an issue in this repository

---

**Note**: This application requires a valid Gemini API key for full functionality. The basic analysis will work without the API key, but AI-powered features require proper configuration.