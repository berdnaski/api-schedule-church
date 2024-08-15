import { SongsRepository } from "@/repositories/songs-repository";
import { Prisma, Song } from "@prisma/client";

export class CreateSongUseCase {
    constructor(
        private songsRepository: SongsRepository
    ) {}

    async execute(data: Prisma.SongCreateInput): Promise<Song> {
        return this.songsRepository.create(data);
    }
}