import { PrismaViceRepository } from "@/repositories/prisma/prisma-vice-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"; 
import { GetViceByUserIdUseCase } from "../vice/getVice";

export function makeGetViceUseCase(){
    const viceRepository = new PrismaViceRepository();
    const usersRepository = new PrismaUsersRepository(); 
    const viceUseCase = new GetViceByUserIdUseCase(viceRepository, usersRepository); 

    return viceUseCase;
}
