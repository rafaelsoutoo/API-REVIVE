import { EconomyRepository } from "@/repositories/EconomyRepository";
import { ViceRepository } from "@/repositories/vice-repository";
import { Economy } from "@prisma/client";
import { ViceNoExistError } from "../error/vice-error";

interface EconomyUseCaseRequest {
  amount: number;
  vice_id: string;
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
    amount,
    vice_id,
  }: EconomyUseCaseRequest): Promise<EconomyUseCaseResponse> {
    const vice = await this.viceRepository.findById(vice_id);

    if (!vice) {
      throw new ViceNoExistError;
    }

    const economy = await this.economyRepository.create({
      vice_id,
      amount,
    });

    return { economy }
  }
}

