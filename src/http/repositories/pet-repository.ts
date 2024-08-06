import { Prisma, Pet } from "@prisma/client";

export interface petAbout {
  address: string;
  color?: string;
  size?: string;
  years?: string;
  energy_level?: string;
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findAll(params: petAbout): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
