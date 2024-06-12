import { PrismaViceRepository } from "@/repositories/prisma/prisma-vice-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"; 
import { CreateViceUseCase } from "../vice/createVice"; 

export function makeCreateViceUseCase(){
    const viceRepository = new PrismaViceRepository();
    const usersRepository = new PrismaUsersRepository(); 
    const viceUseCase = new CreateViceUseCase(viceRepository, usersRepository); 

    return viceUseCase;
}
