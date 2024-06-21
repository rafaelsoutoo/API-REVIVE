import { Economy, Prisma } from "@prisma/client";

export interface EconomyRepository {
  create(data: Prisma.EconomyUncheckedCreateInput): Promise<Economy>;
  findById(id: string): Promise<Economy | null>;
  update(economy_id: string, data: Prisma.EconomyUpdateInput): Promise<Economy>;
  findEconomyByViceID(viceId: string): Promise<Economy[]>



}