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
}