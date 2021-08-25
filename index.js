require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const { errorHandling } = require('./src/middleware');
const cookieParser = require('cookie-parser');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
const optionCors = {
  credentials: true,
  origin: 'http://localhost:3000',
};
app.use(cors(optionCors));

// Cookie Parser
app.use(cookieParser());

// api routes
app.use('/v1', routes);
app.use('/files', express.static('./public/images'));

app.use((err, req, res, next) => {
  errorHandling(err, req, res, next);
  next();
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
