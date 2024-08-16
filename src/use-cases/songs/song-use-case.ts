import { SongsRepository } from "@/repositories/songs-repository";
import { Song } from '@prisma/client';

export class SongUseCase {
    constructor(
        private songsRepository: SongsRepository
    ) {}

    async execute(songId: string): Promise<Song> {
        const song = await this.songsRepository.findById(songId);

        if(!song) {
            throw new Error("Song not found");
        }

        return song;
    }
}