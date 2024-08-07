import { makeAuthenticateOrgUseCase } from "@/factories/make-authenticate.org";
import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrgParamsSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authenticateOrgParamsSchema.parse(request.body);

  const orgUseCase = makeAuthenticateOrgUseCase();
  const { org } = await orgUseCase.execute({
    email,
    password,
  });

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
      },
    },
  );

  return reply.status(201).send({ token });
}
