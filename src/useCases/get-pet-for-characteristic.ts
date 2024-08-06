/* eslint-disable no-useless-constructor */

import { Pet } from "@prisma/client";

import { PetRepository } from "@/http/repositories/pet-repository";

interface RegisterPetUseCaseRequest {
  address: string;
  color?: string;
  size?: string;
  years?: string;
  energy_level?: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet[];
}

export class RegisterUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    address,
    color,
    size,
    years,
    energy_level,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.findAll({
      address,
      color,
      size,
      years,
      energy_level,
    });

    if (!pet) {
      throw new Error("There is no pet with this characteristic");
    }

    return { pet };
  }
}
