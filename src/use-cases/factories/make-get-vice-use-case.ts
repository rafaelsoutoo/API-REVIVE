import { PrismaViceRepository } from "@/repositories/prisma/prisma-vice-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"; 
import { GetViceByUserIdUseCase } from "../vice/getVice";
import { PrismaEconomyRepository } from "@/repositories/prisma/prisma-economy-repository";

export function makeGetViceUseCase(){
    const viceRepository = new PrismaViceRepository();
    const usersRepository = new PrismaUsersRepository(); 
    const economyReposity = new PrismaEconomyRepository(); 
    const viceUseCase = new GetViceByUserIdUseCase(viceRepository, usersRepository, economyReposity); 

    return viceUseCase;
}
