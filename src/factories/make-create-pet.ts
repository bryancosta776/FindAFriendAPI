import { PrismaOrgRepository } from "../prisma/prisma-org-repository";
import { RegisterPetUseCase } from "@/useCases/register-pet";
import { PrismaPetRepository } from "../prisma/prisma-pet-repository";

export function makeCreatePetUseCase() {
  return new RegisterPetUseCase(
    new PrismaPetRepository(),
    new PrismaOrgRepository(),
  );
}
