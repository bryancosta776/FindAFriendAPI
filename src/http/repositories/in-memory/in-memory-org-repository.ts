import { Org, Prisma } from "@prisma/client";
import { findOrgForCityParams, OrgRepository } from "../org-repository";
import { getDistanceBetweenCoordinates } from "utils/get-distance-between-coordinates";

export class inMemoryOrgRepository implements OrgRepository {
  public items: Org[] = [];

  async findOrgforCity(params: findOrgForCityParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }

  async findById(id: string) {
    const OrgId = this.items.find((item) => item.id === id);

    if (!OrgId) {
      return null;
    }

    return OrgId;
  }

  async findByEmail(email: string) {
    const orgEmail = this.items.find((item) => item.email === email);

    if (!orgEmail) {
      return null;
    }

    return orgEmail;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password: data.password,
      city: data.city,
      address: data.address,
      WhatsApp: data.WhatsApp,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
    };

    this.items.push(org);

    return org;
  }
}
