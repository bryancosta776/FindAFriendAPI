import { FastifyInstance } from "fastify";
import { createPet } from "./create";
import { ListPet } from "./listPet";

export async function PetRoutes(app: FastifyInstance) {
  app.post("/pet", createPet);
  app.get("/pet/list", ListPet);
}
