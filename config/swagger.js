'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: true,
  specUrl: '/swagger.json',

  options: {
    swaggerDefinition: {
      info: {
        description: 'This is the swagger documentation of the [VUTTR](https://github.com/danielbergholz/vuttr-backend) application',
        version: '1.0.0',
        title: 'Very useful tools to remember REST API',
        contact: {
          email: 'bergholz.daniel@gmail.com'
        }

      },
      basePath: '/',
      tags: [
        {
          name: 'tool',
          description: "Operations about user's tools"
        },
        {
          name: 'user',
          description: 'Operations about user'
        },
        {
          name: 'session',
          description: 'Generate JWT'
        }
      ],

      paths: {
        '/user': {
          post: {
            tags: [
              'user'
            ],
            summary: 'Create user',
            operationId: 'createUser',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Request body to create user',
                required: true,
                schema: {
                  properties: {
                    name: {
                      type: 'string',
                      example: 'luisa'
                    },
                    email: {
                      type: 'string',
                      example: 'luisa@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: '123123'
                    }
                  }

                }
              }
            ],
            responses: {
              201: {
                description: 'User created successfully',
                schema: {
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1
                    },
                    name: {
                      type: 'string',
                      example: 'luisa'
                    },
                    email: {
                      type: 'string',
                      example: 'luisa@gmail.com'
                    }
                  }

                }
              },
              400: {
                description: 'User already exists or Missing body param',
                schema: {
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          put: {
            tags: [
              'user'
            ],
            summary: 'Update user (must be authenticated)',
            operationId: 'updateUser',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Request body to update user info',
                required: true,
                schema: {
                  properties: {
                    name: {
                      type: 'string',
                      example: 'luisa',
                      required: false
                    },
                    password: {
                      type: 'string',
                      example: '123123'
                    },
                    new_password: {
                      type: 'string',
                      example: '111111',
                      required: false
                    }
                  }

                }
              }, {
                in: 'header',
                name: 'Authorization',
                type: 'string',
                description: 'Must provide bearer token (JWT) on header',
                required: true,
                example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
              }
            ],
            responses: {
              200: {
                description: 'User updated successfully',
                schema: {
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1
                    },
                    name: {
                      type: 'string',
                      example: 'luisa'
                    },
                    email: {
                      type: 'string',
                      example: 'luisa@gmail.com'
                    }
                  }

                }
              },
              400: {
                description: 'Missing password on request body or Invalid password',
                schema: {
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          delete: {
            tags: [
              'user'
            ],
            summary: 'Delete user (must be authenticated)',
            operationId: 'deleteUser',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Request body to delete',
                required: true,
                schema: {
                  properties: {
                    password: {
                      type: 'string',
                      example: '123123'
                    }
                  }

                }
              }, {
                in: 'header',
                name: 'Authorization',
                type: 'string',
                description: 'Must provide bearer token (JWT) on header',
                required: true,
                example: ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
              }
            ],
            responses: {
              204: {
                description: 'User deleted successfully'
              },
              400: {
                description: 'Missing password on request body or Invalid password',
                schema: {
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        '/session': {
          post: {
            tags: [
              'session'
            ],
            summary: 'Create session',
            operationId: 'createSession',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Request body to generate JWT',
                required: true,
                schema: {
                  properties: {
                    email: {
                      type: 'string',
                      example: 'luisa@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: '123123'
                    }
                  }
                }
              }
            ],
            responses: {
              200: {
                description: 'OK',
                schema: {
                  properties: {
                    type: {
                      type: 'string',
                      example: 'bearer'
                    },
                    token: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
                    },
                    refreshToken: {
                      type: 'null',
                      example: null
                    },
                    user: {
                      type: 'object',
                      example: {
                        id: 2,
                        name: 'luisa',
                        email: 'luisa@gmail.com'
                      }
                    }
                  }

                }
              },
              401: {
                description: 'Wrong password or Cannot find user with provided email'
              }
            }
          }
        },
        '/tool': {
          get: {
            tags: [
              'tool'
            ],
            summary: 'List the user tools (must be authenticated)',
            operationId: 'listTools',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'query',
                name: 'page',
                description: 'Provide page number',
                required: false,
                example: 1
              }, {
                in: 'query',
                name: 'tag',
                description: 'Filter by tag',
                required: false,
                example: 'node'
              }, {
                in: 'header',
                name: 'Authorization',
                type: 'string',
                description: 'Must provide bearer token (JWT) on header',
                required: true,
                example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
              }
            ],
            responses: {
              200: {
                description: 'OK',
                schema: {
                  properties: {
                    total: {
                      type: 'string',
                      example: '1'
                    },
                    perPage: {
                      type: 'integer',
                      example: 5
                    },
                    page: {
                      type: 'integer',
                      example: 1
                    },
                    lastPage: {
                      type: 'integer',
                      example: 1
                    },
                    data: {
                      type: 'array',
                      items: { type: 'object' },
                      example: [{
                        id: 12,
                        user_id: 2,
                        title: 'notion',
                        link: 'https://www.notion.io/',
                        description: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
                        tags: [
                          'web',
                          'produtividade',
                          'notion'
                        ]
                      }]
                    }
                  }
                }
              }
            }
          },
          post: {
            tags: [
              'tool'
            ],
            summary: 'Create tool (must be authenticated)',
            operationId: 'createTool',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Tool info',
                required: true,
                schema: {
                  properties: {
                    title: {
                      type: 'string',
                      example: 'trello'
                    },
                    link: {
                      type: 'string',
                      example: 'https://trello.com'
                    },
                    description: {
                      type: 'string',
                      example: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.'
                    },
                    tags: {
                      type: 'array',
                      items: { type: 'string' },
                      example: [
                        'web',
                        'produtividade',
                        'notion']
                    }
                  }
                }
              }, {
                in: 'header',
                name: 'Authorization',
                type: 'string',
                description: 'Must provide bearer token (JWT) on header',
                required: true,
                example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
              }
            ],
            responses: {
              201: {
                description: 'Tool created',
                schema: {
                  properties: {
                    user_id: {
                      type: 'integer',
                      example: 2
                    },
                    id: {
                      type: 'integer',
                      example: 8
                    },
                    title: {
                      type: 'string',
                      example: 'trello'
                    },
                    link: {
                      type: 'string',
                      example: 'https://trello.com'
                    },
                    description: {
                      type: 'string',
                      example: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.'
                    },
                    tags: {
                      type: 'array',
                      items: { type: 'string' },
                      example: [
                        'web',
                        'produtividade',
                        'notion']
                    }
                  }
                }
              },
              400: {
                description: "Missing 'title', 'link', 'tags' on request body or Tool already exists",
                schema: {
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          put: {
            tags: [
              'tool'
            ],
            summary: 'Update tool (must be authenticated)',
            operationId: 'updateTool',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Tool info',
                required: true,
                schema: {
                  properties: {
                    id: {
                      type: 'integer',
                      example: '8'
                    },
                    title: {
                      type: 'string',
                      example: 'fastify'
                    },
                    link: {
                      type: 'string',
                      example: 'https://fastify.io',
                      required: false
                    },
                    description: {
                      type: 'string',
                      example: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
                      required: false
                    },
                    tags: {
                      type: 'array',
                      required: false,
                      items: { type: 'string' },
                      example: [
                        'web',
                        'produtividade',
                        'notion']
                    }
                  }
                }
              }, {
                in: 'header',
                name: 'Authorization',
                type: 'string',
                description: 'Must provide bearer token (JWT) on header',
                required: true,
                example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
              }
            ],
            responses: {
              200: {
                description: 'Tool updated',
                schema: {
                  properties: {
                    user_id: {
                      type: 'integer',
                      example: 2
                    },
                    id: {
                      type: 'integer',
                      example: 8
                    },
                    title: {
                      type: 'string',
                      example: 'fastify'
                    },
                    link: {
                      type: 'string',
                      example: 'https://fastify.io'
                    },
                    description: {
                      type: 'string',
                      example: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.'
                    },
                    tags: {
                      type: 'array',
                      items: { type: 'string' },
                      example: [
                        'web',
                        'produtividade',
                        'fastify']
                    }
                  }
                }
              },
              400: {
                description: 'Missing "id", "title" field on body or Tool already exists',
                schema: {
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        '/tool/{toolId}': {
          delete: {
            tags: [
              'tool'
            ],
            summary: 'Delete tool (must be authenticated)',
            operationId: 'deleteTool',
            consumes: [
              'application/json'
            ],
            produces: [
              'application/json'
            ],
            parameters: [
              {
                in: 'path',
                name: 'toolId',
                description: 'Tool ID to delete',
                required: true,
                type: 'integer'
              }, {
                in: 'header',
                name: 'Authorization',
                type: 'string',
                description: 'Must provide bearer token (JWT) on header',
                required: true,
                example: ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU5NTYwMjkxOCwiZXhwIjoxNTk1Njg5MzE4fQ.UpXtaAR0E2YKB_7EvIidvtYOwfocNi_zK95yzpzQhbI'
              }
            ],
            responses: {
              204: {
                description: 'Tool deleted successfully'
              },
              400: {
                description: 'Tool with provided ID not found',
                schema: {
                  properties: {
                    error: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      },
      definitions: {
        Tool: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64'
            },
            user_id: {
              type: 'integer',
              format: 'int64'
            },
            title: {
              type: 'string'
            },
            link: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            tags: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },

        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            },
            created_at: {
              type: 'string'
            },
            updated_at: {
              type: 'string'
            }
          },
          xml: {
            name: 'User'
          }
        }
      }
    },

    // Path to the API docs
    // Sample usage
    // apis: [
    //    'docs/**/*.yml',    // load recursive all .yml file in docs directory
    //    'docs/**/*.js',     // load recursive all .js file in docs directory
    // ]
    apis: [
      'app/**/*.js',
      'start/routes.js'
    ]
  }
}
