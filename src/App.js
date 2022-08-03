require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const routerApi = require('./routes');
const { logError, errorHandler } = require('./middlewares/error.handler');

const { PORT, HOST } = process.env;
// instance of express
const app = express();

// Format request to json
app.use(express.json());

// Cors
app.use(cors());

app.use(helmet());

// Routes
routerApi(app);

// Error handlers
app.use(logError);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
