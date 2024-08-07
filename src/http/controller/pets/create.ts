import { OrgDoesNotExists } from "@/errors/orgDoesNotExistsError";
import { makeCreatePetUseCase } from "@/factories/make-create-pet";
import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createOrgParamsSchema = z.object({
    name: z.string(),
    color: z.string(),
    years: z.string(),
    orgId: z.string(),
    address: z.string(),
    size: z.string(),
    energy_level: z.string(),
  });

  const { name, color, years, address, size, energy_level } =
    createOrgParamsSchema.parse(request.body);

  const orgUseCase = makeCreatePetUseCase();

  const org_id = request.user.sub;

  try {
    const { pet } = await orgUseCase.execute({
      name,
      color,
      years,
      orgId: org_id,
      address,
      size,
      energy_level,
    });
    return reply.status(201).send({ pet });
  } catch (error) {
    if (error instanceof OrgDoesNotExists) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
