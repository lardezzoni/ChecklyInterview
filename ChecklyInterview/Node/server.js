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

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://trusted.cdn.com'],
      styleSrc: ["'self'", 'https://trusted.cdn.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://trusted.cdn.com'],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);


//rate limiter
const rateLimiter = require('express-rate-limit');

const generalLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000, 
    max: 15, 
    message: 'Too many requests from this IP, please try again later',
});

app.use(generalLimiter);

//secure session manager

const session = require('express-session');

app.use(
  session({
    secret: process.env.SSM_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, 
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
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

// Fallback route 
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