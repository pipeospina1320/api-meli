const express = require('express');
const { search } = require('../controllers/items.controller');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { query } = req;
    const items = await search(query);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
});

module.exports = router;
