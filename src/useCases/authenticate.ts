/* eslint-disable no-useless-constructor */

import { Org } from "@prisma/client";

import { OrgRepository } from "@/http/repositories/org-repository";
import { compare } from "bcryptjs";
import { InvalidPasswordError } from "@/errors/invalidPasswordError";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgUseCaseResponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new Error("Org does not exists");
    }

    const confirmPassword = await compare(password, org.password);

    if (!confirmPassword) {
      throw new InvalidPasswordError();
    }

    return { org };
  }
}
