import { makeGetPetUseCase } from "@/factories/make-list-pet";
import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

export async function ListPet(request: FastifyRequest, reply: FastifyReply) {
  const createOrgParamsSchema = z.object({
    address: z.string(),
    color: z.string(),
    size: z.string(),
    years: z.string(),
    energy_level: z.string(),
  });

  const { address, color, size, years, energy_level } =
    createOrgParamsSchema.parse(request.query);

  const orgUseCase = makeGetPetUseCase();
  await orgUseCase.execute({ address, color, size, years, energy_level });

  return reply.status(201).send({});
}
