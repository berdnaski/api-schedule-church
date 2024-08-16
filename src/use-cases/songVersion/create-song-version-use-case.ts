import { SongVersionRepository } from "@/repositories/song-version-repository";
import { Prisma, SongVersion } from "@prisma/client";

export class CreateSongVersionUseCase {
    constructor(
        private songVersionRepository: SongVersionRepository
    ) {}

    async execute(data: Prisma.SongVersionCreateInput): Promise<SongVersion> {
        return this.songVersionRepository.create(data);
    }
}
