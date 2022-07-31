const express = require('express');
const itemsRouter = require('./items.router');

function routerApi(app = express) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/items', itemsRouter);
  router.use((req, res) => {
    res.status(404).json({
      message: 'Not found'
    });
  });
}

module.exports = routerApi;
