import { ListPetUseCase } from "@/useCases/listPet";
import { PrismaPetRepository } from "@/prisma/prisma-pet-repository";

export function makeGetPetUseCase() {
  return new ListPetUseCase(new PrismaPetRepository());
}
