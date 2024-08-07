import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { OrgRoutes } from "./http/controller/org/routes";
import { PetRoutes } from "./http/controller/pets/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.data.JWT_SECRET,
});

app.register(OrgRoutes);
app.register(PetRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.data.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error" });
});
