import { PrismaEconomyRepository } from "@/repositories/prisma/prisma-economy-repository";
import { UpdateAmount } from "../vice/updateEconomy";

export function makeUpdateAmountUseCase(){
    const economyRepository = new PrismaEconomyRepository(); 
    const viceUseCase = new UpdateAmount(economyRepository); 

    return viceUseCase;
}
