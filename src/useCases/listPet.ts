import { Pet } from "@prisma/client";

import { PetRepository } from "@/http/repositories/pet-repository";

interface ListPetUseCaseRequest {
  address: string;
  color?: string;
  size?: string;
  years?: string;
  energy_level?: string;
}

interface ListPetUseCaseResponse {
  pet: Pet[];
}

export class ListPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    address,
    color,
    size,
    years,
    energy_level,
  }: ListPetUseCaseRequest): Promise<ListPetUseCaseResponse> {
    const pet = await this.petRepository.findAll({
      address,
      color,
      size,
      years,
      energy_level,
    });

    if (!pet) {
      throw new Error("There is no such city");
    }

    return { pet };
  }
}
