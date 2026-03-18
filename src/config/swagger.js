import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SnapFetch API",
    version: "1.0.0",
    description: "Media downloader API powered by yt-dlp"
  },
  servers: [{ url: "http://localhost:4000" }],
  components: {
    parameters: {
      UrlQuery: {
        in: "query",
        name: "url",
        required: true,
        schema: { type: "string", format: "uri" },
        description: "Source media URL"
      }
    }
  }
};

export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js"]
});