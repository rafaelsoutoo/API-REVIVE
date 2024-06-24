import { EconomyRepository } from "@/repositories/EconomyRepository";
import { ViceRepository } from "@/repositories/vice-repository";
import { Economy } from "@prisma/client";
import { ViceNoExistError } from "../error/vice-error";

interface EconomyUseCaseRequest {
  unit: number;
  originalAmount: number;
}

interface EconomyUseCaseResponse {
  economy: Economy;
}

export class EconomyViceUseCase {
  constructor(
    private viceRepository: ViceRepository,
    private economyRepository: EconomyRepository
  ) { }

  async execute({
    unit,
    originalAmount,
  }: EconomyUseCaseRequest): Promise<EconomyUseCaseResponse> {
    const vice = await this.viceRepository.findLatest();

    if (!vice) {
      throw new ViceNoExistError();
    }

    const economy = await this.economyRepository.create({
      unit,
      vice_id: vice.id,
      originalAmount,
    });

    return { economy };
  }
}
