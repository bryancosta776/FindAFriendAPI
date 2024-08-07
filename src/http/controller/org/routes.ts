import { FastifyInstance } from "fastify";
import { createOrg } from "./create";
import { authenticate } from "./authenticate";

import { nearby } from "./get-orgs";

export async function OrgRoutes(app: FastifyInstance) {
  app.post("/org", createOrg);
  app.post("/sessions", authenticate);
  app.get("/orgs/nearby", nearby);
}
