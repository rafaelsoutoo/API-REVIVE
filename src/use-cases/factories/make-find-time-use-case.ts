import { PrismaViceRepository } from "@/repositories/prisma/prisma-vice-repository";
import { FindTimeOfVice } from "../vice/timeVice";

export function makeFindTimeViceUseCase(){
    const viceRepository = new PrismaViceRepository();
    const viceUseCase = new FindTimeOfVice(viceRepository); 

    return viceUseCase;
}
