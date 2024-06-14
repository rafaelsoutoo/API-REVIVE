import { ViceRepository } from "@/repositories/vice-repository";
import { ViceNoExistError } from "../error/vice-error";

export class FindTimeOfVice{
    constructor(private viceRepository: ViceRepository) {}

    async execute(viceId: string){
        const vice = await this.viceRepository.findById(viceId)

        if (!vice) {
            throw new ViceNoExistError();
        }

        const date = vice.date

        const now = new Date()
        const time = now.getTime() - new Date(date).getTime()

        const timeInSeconds = time / 1000

        return {
            date,
            timeInSeconds
        }
    }

}