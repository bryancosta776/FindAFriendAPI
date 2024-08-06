/* eslint-disable no-useless-constructor */

import { hash } from "bcryptjs";

import { Org } from "@prisma/client";
import { OrgRepository } from "@/http/repositories/org-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  address: string;
  WhatsApp: string;
  latitude: number;
  longitude: number;
}

interface RegisterUseCaseResponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    address,
    city,
    WhatsApp,
    password,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userWithEmail = await this.orgRepository.findByEmail(email);

    if (userWithEmail) {
      throw new Error("E-mail already exists");
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password: passwordHash,
      city,
      address,
      WhatsApp,
      longitude,
      latitude,
    });

    return { org };
  }
}
