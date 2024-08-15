import { PrismaClient, Prisma, Song } from "@prisma/client";
import { SongsRepository } from "../songs-repository";

const prisma = new PrismaClient();

export class PrismaSongsRepository implements SongsRepository {
    create(data: Prisma.SongCreateInput): Promise<Song> {
        return prisma.song.create({
            data,
        })
    }
}
