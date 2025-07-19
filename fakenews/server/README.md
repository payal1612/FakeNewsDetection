# TruthGuard Backend API

A robust Node.js/Express.js backend for the TruthGuard news verification platform.

## Features

- **Authentication & Authorization**: JWT-based auth with Supabase integration
- **News Analysis**: AI-powered fake news detection and credibility scoring
- **User Management**: Profile management and analysis history
- **Rate Limiting**: Protection against abuse and spam
- **Comprehensive Logging**: Winston-based logging system
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet.js for security headers and CORS configuration

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### News Analysis
- `POST /api/news/analyze` - Analyze news content for credibility
- `GET /api/news/trending` - Get trending news articles
- `GET /api/news/preview` - Get news article preview
- `GET /api/news/search` - Search news articles

### Analysis History
- `GET /api/analysis/history` - Get user's analysis history
- `GET /api/analysis/:id` - Get specific analysis
- `DELETE /api/analysis/:id` - Delete analysis
- `GET /api/analysis/stats/summary` - Get analysis statistics

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/avatar` - Update user avatar
- `DELETE /api/user/account` - Delete user account

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get contact submissions (admin)

## Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - JWT expiration time
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window
- `LOG_LEVEL` - Logging level

## Project Structure

```
server/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── routes/          # API route handlers
├── services/        # Business logic services
├── utils/           # Utility functions
├── logs/            # Log files
├── .env.example     # Environment template
├── package.json     # Dependencies
├── server.js        # Main server file
└── README.md        # This file
```

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Request rate limiting
- **Input Validation**: Request validation and sanitization
- **JWT Authentication**: Secure token-based authentication
- **Error Handling**: Secure error responses

## Logging

The application uses Winston for comprehensive logging:
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`
- Console output in development mode

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production environment variables
3. Use a process manager like PM2
4. Set up reverse proxy (nginx)
5. Configure SSL certificates
6. Set up monitoring and logging

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Submit pull requests

## License

MIT License