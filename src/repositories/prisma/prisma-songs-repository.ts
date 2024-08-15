import { PrismaClient, Prisma, Song } from "@prisma/client";
import { SongsRepository } from "../songs-repository";
import { prisma } from './../../lib/prisma';

export class PrismaSongsRepository implements SongsRepository {
    private prisma = new PrismaClient();

    async create(data: Prisma.SongCreateInput): Promise<Song> {
        return prisma.song.create({
            data,
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.song.delete({ where: { id } });
    }
}
