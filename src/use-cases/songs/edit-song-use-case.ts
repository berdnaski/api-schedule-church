import { Song } from "@prisma/client";
import { EditSongDTO } from "../dtos/edit-song-dto";
import { SongsRepository } from "@/repositories/songs-repository";

export class EditSongUseCase {
    constructor(
        private songsRepository: SongsRepository
    ) {}

    async execute(songId: string, data: EditSongDTO): Promise<Song | null> {
        const song = await this.songsRepository.findById(songId);

        if (!song) {
            throw new Error("Song not found");
        }

        return this.songsRepository.update(songId, data);
    }
}
