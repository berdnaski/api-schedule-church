import { PrismaSongsRepository } from "@/repositories/prisma/prisma-songs-repository";
import { DeleteSongUseCase } from "@/use-cases/songs/delete-song-use-case";

export function makeDeleteSongUseCase() {
    const songsRepository = new PrismaSongsRepository();
    return new DeleteSongUseCase(songsRepository);
}