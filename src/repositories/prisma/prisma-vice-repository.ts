import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ViceRepository } from "../vice-repository";

export class PrismaViceRepository implements ViceRepository {
    async create(data: Prisma.ViceUncheckedCreateInput) {
        const vice = await prisma.vice.create({
            data,
        });

        return vice;
    }

    async findViceByIdUser(userId: string) {
        const vice = await prisma.vice.findMany({
            where: {
                user_id: userId,
            },
            include: {
                economy: true, 
            },
        });
        return vice;
    }

    async findByName(name: string) {
        const vice = await prisma.vice.findFirst({
            where: {
                name,
            },
        });

        return vice;
    }

    async findById(viceId: string) {
        const vice = await prisma.vice.findUnique({
            where: {
                id: viceId,
            },
        });
        return vice;
    }

    async updateDate(viceId: string, date: string) {
        await prisma.vice.update({
            where: {
                id: viceId,
            },
            data: {
                date,
            },
        });
    }

    async findLatest() {
        const vice = await prisma.vice.findFirst({
            orderBy: {
                created_at: 'desc',
            },
        });
        return vice;
    }
}
