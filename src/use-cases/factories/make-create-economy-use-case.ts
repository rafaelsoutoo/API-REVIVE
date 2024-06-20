import { PrismaViceRepository } from "@/repositories/prisma/prisma-vice-repository";
import { PrismaEconomyRepository } from "@/repositories/prisma/prisma-economy-repository";
import { EconomyViceUseCase } from "../vice/economyVice";

export function makeCreateEconomyUseCase(){
    const viceRepository = new PrismaViceRepository();
    const economyRepository = new PrismaEconomyRepository(); 
    const viceUseCase = new EconomyViceUseCase(viceRepository, economyRepository); 

    return viceUseCase;
}
