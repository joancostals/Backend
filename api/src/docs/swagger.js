const swaggerJSDoc = require('swagger-jsdoc'); 

const options = { 
  definition: { 
    openapi: "3.0.0", 
    info: { 
      title: "E-commerce API", 
      version: "1.0.0", 
      description: "Documentació de l'API del projecte e-commerce. Inclou gestió d'usuaris, productes (pales), comandes, ressenyes i carret de la compra." 
    }, 
    servers: [ 
      { 
        url: "http://localhost:5000",
        description: "Servidor local"
      } 
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id_usuario: { type: "string" },
            nombre: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["client", "admin"] }
          }
        },
        Pala: {
          type: "object",
          properties: {
            id_pala: { type: "string" },
            nombre: { type: "string" },
            marca: { type: "string" },
            precio: { type: "number" },
            stock: { type: "number" }
          }
        },
        Pedido: {
          type: "object",
          properties: {
            id_pedido: { type: "string" },
            id_usuario: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_pala: { type: "string" },
                  nombre: { type: "string" },
                  precio_unitario: { type: "number" },
                  cantidad: { type: "number" }
                }
              }
            },
            detallesEnvio: {
              type: "object",
              properties: {
                nombre: { type: "string" },
                apellidos: { type: "string" },
                correo: { type: "string" },
                direccion: { type: "string" }
              }
            },
            total: { type: "number" },
            fecha: { type: "string", format: "date-time" },
            estado: { type: "string", enum: ["pendiente", "enviado", "entregado", "finalizado"] }
          }
        },
        Resena: {
          type: "object",
          properties: {
            id_reseña: { type: "string" },
            id_usuario: { type: "string" },
            id_pala: { type: "string" },
            comentario: { type: "string" },
            puntuacion: { type: "number" },
            fecha: { type: "string", format: "date-time" }
          }
        },
        Carrito: {
          type: "object",
          properties: {
            id_carrito: { type: "string" },
            id_usuario: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id_pala: { type: "string" },
                  nombre: { type: "string" },
                  precio: { type: "number" },
                  cantidad: { type: "number" }
                }
              }
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  }, 
  apis: ["./src/routes/*.js"] 
}; 

const swaggerSpec = swaggerJSDoc(options); 
module.exports = swaggerSpec;

