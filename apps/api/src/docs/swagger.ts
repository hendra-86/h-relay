import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'H-Relay API',
      version: '0.1.0',
      description: 'Multi-channel messaging relay platform',
    },

    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development',
      },
    ],
  },

  apis: [
    './src/modules/**/*.route.ts',
  ],
});