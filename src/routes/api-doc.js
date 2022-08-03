const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Documentacion',
      version: '1.0.0',
    },

    servers: [
      {
        url: 'http://localhost:8080',
        description: 'API Documentation',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = options;
