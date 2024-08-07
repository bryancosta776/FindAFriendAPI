/* eslint-disable no-useless-constructor */

import { Pet } from "@prisma/client";

import { PetRepository } from "@/http/repositories/pet-repository";
import { OrgRepository } from "@/http/repositories/org-repository";
import { OrgDoesNotExists } from "@/errors/orgDoesNotExistsError";

interface RegisterPetUseCaseRequest {
  name: string;
  color: string;
  years: string;
  orgId: string;
  address: string;
  size: string;
  energy_level: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    name,
    color,
    years,
    orgId,
    address,
    size,
    energy_level,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId);

    if (!org) {
      throw new OrgDoesNotExists();
    }

    const pet = await this.petRepository.create({
      name,
      color,
      years,
      orgId: org.id,
      address,
      size,
      energy_level,
    });

    return { pet };
  }
}
