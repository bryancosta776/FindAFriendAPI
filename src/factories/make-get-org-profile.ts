import { FetchNearbyGymsUseCase } from "@/useCases/fetch-nearby-orgs";
import { PrismaOrgRepository } from "../prisma/prisma-org-repository";

export function makeGetOrgUseCase() {
  const prismaRepository = new PrismaOrgRepository();
  const useCase = new FetchNearbyGymsUseCase(prismaRepository);

  return useCase;
}
