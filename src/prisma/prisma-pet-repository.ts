import { petAbout, PetRepository } from "@/http/repositories/pet-repository";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = await prisma.pet.create({ data });

    return newPet;
  }

  async findAll(params: petAbout) {
    const pets = await prisma.pet.findMany({
      where: {
        years: params.years,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          address: {
            contains: params.address,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }

  async findById(id: string) {
    const findByIdForPet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return findByIdForPet;
  }
}
