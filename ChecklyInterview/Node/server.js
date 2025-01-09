const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require(`dotenv`)
dotenv.config({ path: './config.env' });

//logging using morgan
const winston = require('winston');
const morgan = require('morgan');

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        json()
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'combined.log' }) // Log to a file
    ],
});

// Morgan middleware (logging)
morgan.token('client-ip', (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip || '-');
const morganMiddleware = morgan(
    ':client-ip :method :url :status :res[content-length] - :response-time ms',
    {
        stream: { write: (message) => logger.info(message.trim()) },
    }
);

app.use(morganMiddleware);

//helmet
const helmet = require('helmet');

//there was an error with the fallback page not being correct, but is not helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://*.ngrok.io'], // Allow scripts from ngrok
      styleSrc: ["'self'", "'unsafe-inline'", 'https://*.ngrok.io'], // Allow inline styles
      imgSrc: ["'self'", 'data:', 'https://*.ngrok.io'], // Allow images from ngrok
      connectSrc: ["'self'", 'https://*.ngrok.io'], // Allow connections to ngrok
      fontSrc: ["'self'", 'https://*.ngrok.io'], // Allow fonts from ngrok
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: [], // Optional: If needed for mixed content
    },
  })
);


//rate limiter
const rateLimiter = require('express-rate-limit');

//this is skipping the fallback route

const generalLimiter = rateLimiter({
  windowMs: 2 * 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 15 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  skip: (req) => req.path === '*' || req.path === '/non-existent-page', // Skip fallback and specific paths
});
//testing for fallback route being incorrect
// disabled for testing
//app.use(generalLimiter);

//secure session manager

const session = require('express-session');

app.use(
  session({
    secret: process.env.SSM_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, 
      httpOnly: true, 
      sameSite: 'strict', 
    },
  })
);

//Cross-Origin Resource Sharing (CORS) Configuration
const cors = require('cors');

const corsOptions = {
  origin: 'https://ardezzoni.ngrok.dev', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

app.use(cors(corsOptions));
// Sstatic React build files
app.use(express.static(path.join(__dirname, '../React/checkly-interview/build')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});
app.get('/health', (req, res) => {
  res.status(200).json({
      status: 'success',
      message: 'Server is healthy',
      time: new Date().toISOString(),
  });
});
////////////////////////////////////////
// Fallback route 
//This ensures all routes not explicitly matched (e.g., /non-existent-page)
//are served with the React app's index.html, allowing React Router to manage the route.
////////////////////////////////////////
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../React/checkly-interview/build', 'index.html'));
});
app.use((err, req, res, next) => {
  logger.error('Internal server error', { error: err });
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
