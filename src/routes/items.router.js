const express = require('express');
const { search, getById } = require('../controllers/items.controller');

const router = express.Router();

/**
 * @openapi
 * /api/items:
 *   get:
 *     description: Listado de items
 *     responses:
 *       200:
 *         description: Retorna un array de items.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  author:
 *                    type: object
 *                  categories:
 *                    type: array
 *                  items:
 *                    type: array
 *   parameters:
 *      - name: q
 *        in: query
 *        description: Obtener ítems de una consulta de búsqueda
 *        required: true
 *        schema:
 *          type: string
 *          default: ''
 *      - name: limit
 *        in: query
 *        description: Limite de registros a retornar
 *        required: true
 *        schema:
 *          type: string
 *          default: ''
 */
router.get('/', async (req, res, next) => {
  try {
    const { query } = req;
    const items = await search(query);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/items/{id}:
 *   get:
 *     description: Listado de items
 *     responses:
 *       200:
 *         description: Retorna un array de items.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *   parameters:
 *      - name: id
 *        in: path
 *        description: Id del item a consultar
 *        required: true
 *        schema:
 *          type: string
 *          default: ''
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getById(id);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
