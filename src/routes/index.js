const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const itemsRouter = require('./items.router');
const options = require('./api-doc');

function routerApi(app = express) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/items', itemsRouter);
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerJsdoc(options)));
  router.use((req, res) => {
    res.status(404).json({
      message: 'Not found'
    });
  });
}

module.exports = routerApi;
