import { UsersRepository } from "@/repositories/users-repository";
import { ViceRepository } from "@/repositories/vice-repository";
import { UserNotExistError } from "../error/user-error";
import { ViceNoExistError } from "../error/vice-error";

export class GetViceByUserIdUseCase {
    constructor(private viceRepository: ViceRepository, private userRepository: UsersRepository) { }

    async execute(userId: string) {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new UserNotExistError()
        }

        const vices = await this.viceRepository.findViceByIdUser(userId);

        if (vices.length === 0) {
            throw new ViceNoExistError()
        }

        return vices
    }
}