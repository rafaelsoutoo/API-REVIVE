import { Prisma, Vice } from "@prisma/client";

export interface ViceRepository {
  create(data: Prisma.ViceUncheckedCreateInput): Promise<Vice>;
  findByName(name:string): Promise<Vice | null>
}