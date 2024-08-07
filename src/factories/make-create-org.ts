import { RegisterOrgUseCase } from "@/useCases/register-org";
import { PrismaOrgRepository } from "../prisma/prisma-org-repository";

export function makeCreateOrgUseCase() {
  const prismaRepository = new PrismaOrgRepository();
  const useCase = new RegisterOrgUseCase(prismaRepository);

  return useCase;
}
