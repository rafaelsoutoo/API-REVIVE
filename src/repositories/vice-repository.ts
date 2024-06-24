import { Prisma, Vice } from "@prisma/client";

export interface ViceRepository {
  create(data: Prisma.ViceUncheckedCreateInput): Promise<Vice>;
  findByName(name:string): Promise<Vice | null>
  findViceByIdUser(userId: string): Promise<Vice[]>
  findById(viceId: string): Promise<Vice | null>
  updateDate(viceId: string, date: string): Promise<void>; 
  findLatest(): Promise<Vice | null>;

}