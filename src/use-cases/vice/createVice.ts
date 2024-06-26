import { UsersRepository } from "@/repositories/users-repository";
import { ViceRepository } from "@/repositories/vice-repository";
import { UserNotExistError } from "../error/user-error"; 
import { Vice } from "@prisma/client";


interface RegisterViceRequest {
    userId: string,
    name: string,
}

interface ViceUseCaseResponse {
    vice: Vice
}

export class CreateViceUseCase {
    constructor(private viceRepository: ViceRepository, private usersRepository: UsersRepository) {}

    async execute({
        userId,
        name
    }: RegisterViceRequest): Promise<ViceUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new UserNotExistError();
        }

        const vice = await this.viceRepository.create({
            user_id: userId,
            name,
        });

        return { vice };
    }
}
