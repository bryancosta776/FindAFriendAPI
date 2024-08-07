import { Org } from "@prisma/client";
import { OrgRepository } from "@/./http/repositories/org-repository";

interface FetchNearbyOrgUseCaseRequest {
  orgLatitude: number;
  orgLongitude: number;
}

interface FetchNearbyOrgUseCaseResponse {
  orgs: Org[];
}
// Ao invés da classe instanciar as dependências, ela vai receber as dependências
export class FetchNearbyGymsUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    orgLatitude,
    orgLongitude,
  }: FetchNearbyOrgUseCaseRequest): Promise<FetchNearbyOrgUseCaseResponse> {
    const orgs = await this.orgsRepository.findOrgforCity({
      latitude: orgLatitude,
      longitude: orgLongitude,
    });

    return { orgs };
  }
}
