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

    async findById(id: string): Promise<Song | null> {
        return prisma.song.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Prisma.SongUpdateInput): Promise<Song | null> {
        return this.prisma.song.update({
            where: { id },
            data
        });
    }

    async listAll(): Promise<Song[]> {
        return this.prisma.song.findMany();
    }
}
