import { EconomyRepository } from "@/repositories/EconomyRepository";
import { EconomyNotExistError } from "../error/economy-errors";

export class UpdateAmount {
    constructor(
        private economyRepository: EconomyRepository
    ) { }
  
    async execute(id: string) {
        const economy = await this.economyRepository.findById(id);

        if (!economy) {
            throw new EconomyNotExistError();
        }

        const originalAmount = economy.originalAmount; 
        const createdAt = new Date(economy.created_at);
        const now = new Date();

       // Calcular dias desde a criação
    //    let daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

       // Calcular segundos desde a criação
       let secondsSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / 1000);


        let newAmount = 0;

        if (secondsSinceCreation > 7) {
            secondsSinceCreation -= 7;
            // Calcular períodos de 7 segundos
            const periodsOfSevenSeconds = Math.floor(secondsSinceCreation / 7);
            const unit = economy.unit;
            newAmount = originalAmount + (originalAmount * periodsOfSevenSeconds) * unit;
        }

        economy.amount = newAmount;

        await this.economyRepository.update(id, economy);

        return newAmount;
    }
}
