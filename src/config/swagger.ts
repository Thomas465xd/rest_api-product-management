import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ], 
        info: {
            title: "REST API NodeJS / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    }, 
    apis: ["./src/router.ts"],
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUIOptions : SwaggerOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url("https://www.svgrepo.com/show/530439/api-interface.svg");
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3a42;
        }
    `,
    customSiteTitle: "REST API NodeJS / Express / TypeScript"
}

export default swaggerSpec
export {
    swaggerUIOptions
}