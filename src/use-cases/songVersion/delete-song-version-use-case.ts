import { SongVersionRepository } from "@/repositories/song-version-repository";

export class DeleteSongVersionUseCase {
    constructor(
        private songVersionRepository: SongVersionRepository
    ) {}

    async execute(id: string): Promise<void> {
        const songVersion = await this.songVersionRepository.findById(id);
        if (!songVersion) {
            throw new Error("Song version not found");
        }
        await this.songVersionRepository.delete(id);
    }
}
