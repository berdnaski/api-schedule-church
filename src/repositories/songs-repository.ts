import { Prisma, Song } from "@prisma/client";

export interface SongsRepository {
    create(data: Prisma.SongCreateInput): Promise<Song>;
}