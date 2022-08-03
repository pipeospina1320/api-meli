const { doGet } = require('../services/fetch.services');
const endPoints = require('../constants/endPoints');

const search = async (params) => {
  // Obtenemos los registros de item y monedas
  const { filters, results } = await doGet(endPoints.search, params);
  const currencies = await doGet(endPoints.currencies);

  let categories = {};
  let items = [];

  if (filters && filters.length > 0) {
    categories = filters.find((item) => item.id === 'category');
  }

  items = results.map((item) => {
    let currencieItem = {};
    if (currencies && currencies.length > 0) {
      currencieItem = currencies.find((currencie) => item.currency_id === currencie.id);
    }

    const {
      id, title, price, thumbnail, condition,
      shipping: {
        free_shipping: freeShipping
      },
      address: { state_name: stateName }
    } = item;
    return {
      id,
      title,
      price: {
        currency: currencieItem.symbol, amount: price, decimal: currencieItem.decimal_places
      },
      picture: thumbnail,
      condition,
      free_shipping: freeShipping,
      stateName
    };
  });

  return {
    author: {
      name: 'Juan',
      lastname: 'Tangarife'
    },
    categories,
    items
  };
};

const getById = async (id) => {
  const params = { ids: id };
  // Filtrado de atributos
  const attributes = [
    'id', 'price', 'catalog_product_id',
    'title', 'currency_id',
    'condition', 'shipping',
    'pictures', 'sold_quantity',
    'shipping', 'thumbnail_id', 'category_id'];
  params.attributes = attributes.toString();
  const data = await doGet(endPoints.getById, params);

  const { code, body } = data[0];
  if (code === 404) {
    throw new Error('Producto no encontrado');
  }

  const {
    id: idItem, title, currency_id: currency,
    price, sold_quantity: soldQuantity, condition,
    thumbnail_id: thumbnailId,
    shipping: {
      free_shipping: freeShipping
    },
    pictures, catalog_product_id: catalogProductId,
    category_id: categoryId
  } = body;

  const currencie = await doGet(`${endPoints.currencies}/${currency}`);
  const categories = await doGet(`${endPoints.categories}/${categoryId}`);

  const picture = pictures.find((item) => item.id === thumbnailId);
  let description = '';
  if (catalogProductId) {
    const product = await doGet(`${endPoints.products}/${catalogProductId}`);
    const { short_description: { content = '' } } = product || {};
    description = content;
  }

  return {
    author: {
      name: 'Juan',
      lastname: 'Tangarife'
    },
    categories,
    item: {
      id: idItem,
      title,
      price: {
        currency: currencie.symbol, amount: price, decimal: currencie.decimal_places
      },
      picture: picture.url,
      condition,
      free_shipping: freeShipping,
      sold_quantity: soldQuantity,
      description
    }
  };
};

module.exports = {
  search,
  getById
};
