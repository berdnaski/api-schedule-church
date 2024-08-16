import { PrismaClient, SongVersion } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface SongVersionRepository {
    create(data: Prisma.SongVersionCreateInput): Promise<SongVersion>;
}

export class PrismaSongVersionRepository implements SongVersionRepository {
    private prisma = new PrismaClient();

    async create(data: Prisma.SongVersionCreateInput): Promise<SongVersion> {
        return this.prisma.songVersion.create({
            data,
        });
    }
}
