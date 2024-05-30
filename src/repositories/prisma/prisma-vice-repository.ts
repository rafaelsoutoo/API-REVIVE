import { Prisma, Vice } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ViceRepository } from "../vice-repository";

export class PrismaViceRepository implements ViceRepository{
    async create(data: Prisma.ViceUncheckedCreateInput){
        const vice = await prisma.vice.create({
            data,
        })

        return vice
    }

    async findByName(name: string) {
        const vice = await prisma.vice.findFirst({
          where: {
            name,
          },
        });
    
        return vice
      } 
}