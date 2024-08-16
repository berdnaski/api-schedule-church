import { EditSongVersionDTO } from "@/use-cases/dtos/edit-song-version-dto";
import { Prisma, SongVersion } from "@prisma/client";

export interface SongVersionRepository {
    create(data: Prisma.SongVersionCreateInput): Promise<SongVersion>;
    findById(id: string): Promise<SongVersion | null>;
    delete(id: string): Promise<void>;
    update(id: string, data: Prisma.SongVersionUpdateInput): Promise<SongVersion | null>;
    listAll(): Promise<SongVersion[]>;
}
