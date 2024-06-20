import { Economy, Prisma } from "@prisma/client";

export interface EconomyRepository {
  create(data: Prisma.EconomyUncheckedCreateInput): Promise<Economy>;
}