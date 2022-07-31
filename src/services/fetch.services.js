const fetch = require('node-fetch');

const HEAD_CONTENT = { 'Content-Type': 'application/json' };

const PATH = process.env.URL_API;

const createPath = (url) => {
  if (!url) {
    throw new Error('La URL es requerida para este metodo');
  }
  return PATH + url;
};

const configRequest = (method, body) => ({
  method: 'post',
  headers: HEAD_CONTENT,
  body: JSON.stringify(body),
});

const doGet = async (path, data = {}) => {
  const urlPath = createPath(path);
  const params = new URLSearchParams(data);
  const url = `${urlPath}?${params.toString()}`;
  console.log(url);
  const response = await fetch(url, configRequest('GET', data));
  const dataJson = await response.json();
  return dataJson;
};

module.exports = { doGet };
