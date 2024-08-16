import { SongVersionRepository } from "@/repositories/song-version-repository";
import { SongVersion } from "@prisma/client";

export class songVersionUseCase {
    constructor(
        private songVersionRepository: SongVersionRepository
    ) {}

    async execute(songVersionId: string): Promise<SongVersion> {
        const song_version = await this.songVersionRepository.findById(songVersionId);

        if(!song_version) {
            throw new Error("Song version not found");
        }
        return song_version;
    }
}