import { PrismaSongsRepository } from "@/repositories/prisma/prisma-songs-repository";
import { CreateSongUseCase } from "@/use-cases/songs/create-song-use-case";

export function makeCreateSongUseCase() {
    const songsRepository = new PrismaSongsRepository();
    return new CreateSongUseCase(songsRepository);
}