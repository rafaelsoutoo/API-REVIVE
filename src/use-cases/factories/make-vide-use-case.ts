import { PrismaViceRepository } from "@/repositories/prisma/prisma-vice-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"; 
import { ViceUseCase } from "../createVice"; 

export function makeViceUseCase(){
    const viceRepository = new PrismaViceRepository();
    const usersRepository = new PrismaUsersRepository(); 
    const viceUseCase = new ViceUseCase(viceRepository, usersRepository); 

    return viceUseCase;
}
