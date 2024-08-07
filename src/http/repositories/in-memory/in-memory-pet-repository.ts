/* eslint-disable no-useless-constructor */
import { Pet, Prisma } from "@prisma/client";
import { InMemoryOrgRepository } from "./in-memory-org-repository";

import { petAbout, PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgRepository) {}

  async findAll(params: petAbout) {
    const orgIdReturn = this.orgsRepository.items.filter(
      (org) => org.address === params.address,
    );

    const pet = this.items
      .filter((item) => orgIdReturn.some((org) => org.id === item.orgId))
      .filter((item) => (params.color ? item.color === params.color : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) => (params.years ? item.years === params.years : true));

    return pet;
  }

  async findById(id: string) {
    const petId = this.items.find((item) => item.id === id);

    if (!petId) {
      throw new Error("Pet does not exists!");
    }

    return petId;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const createPet = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(createPet);

    return createPet;
  }
}
