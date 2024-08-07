import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";
import { makeGetOrgUseCase } from "@/factories/make-get-org-profile";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyOrgQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyOrgQuerySchema.parse(request.query);

  const nearbyOrgUseCase = makeGetOrgUseCase();

  const { orgs } = await nearbyOrgUseCase.execute({
    orgLatitude: latitude,
    orgLongitude: longitude,
  });

  return reply.status(201).send({ orgs });
}
