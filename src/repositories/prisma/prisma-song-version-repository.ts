import { PrismaClient, Prisma, SongVersion } from "@prisma/client";
import { SongVersionRepository } from "../song-version-repository";
import { EditSongVersionDTO } from "@/use-cases/dtos/edit-song-version-dto";

export class PrismaSongVersionRepository implements SongVersionRepository {
    private prisma = new PrismaClient();

    async create(data: Prisma.SongVersionCreateInput): Promise<SongVersion> {
        return this.prisma.songVersion.create({
            data,
        });
    }

    async findById(id: string): Promise<SongVersion | null> {
        return this.prisma.songVersion.findUnique({
            where: { id },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.songVersion.delete({ where: { id } });
    }

    async update(id: string, data: Prisma.SongVersionUpdateInput): Promise<SongVersion | null> {
        return this.prisma.songVersion.update({
            where: { id },
            data
        });
    }

    async listAll(): Promise<SongVersion[]> {
        return this.prisma.songVersion.findMany();
    }
}
