import { Prisma, Org } from "@prisma/client";

export interface findOrgForCityParams {
  latitude: number;
  longitude: number;
}

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findOrgforCity(params: findOrgForCityParams): Promise<Org[]>;
  findById(id: string): Promise<Org | null>;
}
