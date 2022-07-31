const { doGet } = require('../services/fetch.services');

const search = async (params) => {
  const data = await doGet('/', params);
  const { filters, results } = data;
  let categories = [];
  let items = [];
  if (filters && filters.length > 0) {
    categories = filters.find((item) => item.id === 'category');
  }
  items = results.map((item) => {
    const {
      id, title, price, thumbnail, condition,
      shipping: {
        free_shipping: freeShipping
      },
      prices: {
        presentation: { display_currency: displayCurrency }
      }
    } = item;
    return {
      id,
      title,
      price: {
        currency: displayCurrency, amount: price
      },
      picture: thumbnail,
      condition,
      free_shipping: freeShipping
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

module.exports = {
  search
};
