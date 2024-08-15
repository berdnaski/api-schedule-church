import { SongsRepository } from "@/repositories/songs-repository";

export class DeleteSongUseCase {
    constructor(
        private songsRepository: SongsRepository
    ) {}

    async execute(id: string) {
        await this.songsRepository.delete(id);
    }
}