import { Prisma, SongVersion } from "@prisma/client";

export interface SongVersionRepository {
    create(data: Prisma.SongVersionCreateInput): Promise<SongVersion>
}

