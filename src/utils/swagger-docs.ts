import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Dave Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple auth API application made with Express and documented with Swagger",
        contact: {
          name: "David d'almeida",
          url: "code",
          email: "david.dalmeida02@yahoo.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["../../dist/src/*.js/"],
  };
  
  export const swaggerSpec = swaggerJsdoc(options);