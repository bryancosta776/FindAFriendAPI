import { makeCreateOrgUseCase } from "@/factories/make-create-org";
import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgParamsSchema = z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    city: z.string(),
    WhatsApp: z.string(),
    password: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const {
    name,
    email,
    address,
    city,
    WhatsApp,
    password,
    latitude,
    longitude,
  } = createOrgParamsSchema.parse(request.body);

  const orgUseCase = makeCreateOrgUseCase();
  await orgUseCase.execute({
    name,
    email,
    address,
    city,
    WhatsApp,
    password,
    latitude,
    longitude,
  });

  return reply.status(201).send({});
}
