require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const routerApi = require('./routes');
const { logError, errorHandler } = require('./middlewares/error.handler');

const port = process.env.PORT;
// instance of express
const app = express();

// Format request to json
app.use(express.json());

// Cors
app.use(cors());

app.use(helmet());

// Statics
app.use(express.static('public'));

// Routes
routerApi(app);

// Error handlers
app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Corriendo puerto ${port}`);
});
