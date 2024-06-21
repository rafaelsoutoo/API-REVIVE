import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { EconomyRepository } from "../EconomyRepository";

export class PrismaEconomyRepository implements EconomyRepository {
  async create(data: Prisma.EconomyUncheckedCreateInput) {
    const economy = await prisma.economy.create({
      data,
    });

    return economy;
  }

  async findById(id: string){
    const economy = await prisma.economy.findUnique({
      where: {
        id,
      },
    })
    return economy
  }

  async update(economy_id: string, data: Prisma.EconomyUpdateInput) {
    const updatedEconomy = await prisma.economy.update({
      where: {
        id: economy_id,
      },
      data,
    });
    return updatedEconomy;
  }
  
}