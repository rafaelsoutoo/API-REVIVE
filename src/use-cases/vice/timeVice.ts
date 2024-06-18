import { ViceRepository } from "@/repositories/vice-repository";
import { ViceNoExistError } from "../error/vice-error";

export class FindTimeOfVice {
    constructor(private viceRepository: ViceRepository) {}

    async execute(viceId: string, reset: boolean = false) {
        const vice = await this.viceRepository.findById(viceId);

        if (!vice) {
            throw new ViceNoExistError();
        }

        const now = new Date();

        if (reset) {
            await this.viceRepository.updateDate(viceId, now.toISOString());

            return {
                date: now.toISOString(),
                timeInSeconds: 0 
            };
        }

        const time = now.getTime() - new Date(vice.date).getTime();
        const timeInSeconds = time / 1000;

        return {
            date: vice.date,
            timeInSeconds
        };
    }
}
