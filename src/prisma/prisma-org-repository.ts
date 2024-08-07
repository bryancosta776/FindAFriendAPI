import {
  findOrgForCityParams,
  OrgRepository,
} from "@/http/repositories/org-repository";
import { prisma } from "@/lib/prisma";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const createOrg = await prisma.org.create({
      data,
    });

    return createOrg;
  }

  async findByEmail(email: string) {
    const findByEmail = await prisma.org.findFirst({
      where: {
        email,
      },
    });

    return findByEmail;
  }

  async findOrgforCity({ latitude, longitude }: findOrgForCityParams) {
    const org = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `;

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const findByIdForOrg = await prisma.org.findFirstOrThrow({
      where: {
        id,
      },
    });

    return findByIdForOrg;
  }
}
