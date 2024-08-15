import { Prisma, Song } from "@prisma/client";

export interface SongsRepository {
    create(data: Prisma.SongCreateInput): Promise<Song>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Song | null>;
    update(id: string, data: Prisma.SongUpdateInput): Promise<Song | null>;
    listAll(): Promise<Song[]>;
}