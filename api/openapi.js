// api/openapi.js
// OpenAPI 3.0 specification for the application's backend.

export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Scalable React App API',
    version: '1.0.0',
    description: 'API for user authentication, dashboard data, and other core features.',
  },
  servers: [
    {
      url: 'https://api.example.com/v1',
      description: 'Production Server',
    },
  ],
  paths: {
    '/auth/login': {
      post: {
        summary: 'User Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        username: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/dashboard': {
      get: {
        summary: 'Get Dashboard Data',
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'Dashboard data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    activeFiles: { type: 'integer' },
                    commitsToday: { type: 'integer' },
                    openPullRequests: { type: 'integer' },
                    buildStatus: { type: 'string', enum: ['SUCCESS', 'FAILURE', 'PENDING'] },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};
