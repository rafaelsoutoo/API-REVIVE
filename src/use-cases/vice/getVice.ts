import { UsersRepository } from "@/repositories/users-repository";
import { ViceRepository } from "@/repositories/vice-repository";
import { UserNotExistError } from "../error/user-error";
import { ViceNoExistError } from "../error/vice-error";
import { EconomyRepository } from "@/repositories/EconomyRepository"; 


export class GetViceByUserIdUseCase {
    constructor(private viceRepository: ViceRepository, private userRepository: UsersRepository, private economyRepository: EconomyRepository) { }

    async execute(userId: string) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new UserNotExistError();
        }

        const vices = await this.viceRepository.findViceByIdUser(userId);

        if (vices.length === 0) {
            throw new ViceNoExistError();
        }

        const vicesWithEconomy = await Promise.all(
            vices.map(async (vice) => {
                const economies = await this.economyRepository.findEconomyByViceID(vice.id);

                return {
                    id: vice.id,
                    name: vice.name,
                    date: vice.date,
                    created_at: vice.created_at,
                    user_id: vice.user_id,
                    economies: economies.map(economy => ({
                        economyId: economy.id,
                        unit: economy.unit,
                        amount: economy.amount
                    })),
                };
            })
        );

        return vicesWithEconomy;
    }
}
