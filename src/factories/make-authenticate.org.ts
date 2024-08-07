import { AuthenticateUseCase } from "@/useCases/authenticate";
import { PrismaOrgRepository } from "../prisma/prisma-org-repository";

export function makeAuthenticateOrgUseCase() {
  const prismaRepository = new PrismaOrgRepository();
  const useCase = new AuthenticateUseCase(prismaRepository);

  return useCase;
}
