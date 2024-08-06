import { env } from "./env";
import { app } from "./app";

app
  .listen({
    host: "0.0.0.0",
    port: env.data.PORT,
  })
  .then(() => {
    console.log("HTTP server running!  ");
  });
