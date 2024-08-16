import { PrismaSongsRepository } from "@/repositories/prisma/prisma-songs-repository";
import { SongUseCase } from "@/use-cases/songs/song-use-case";

export function makeSongUseCase() {
    const songsRepository = new PrismaSongsRepository();
    return new SongUseCase(songsRepository);
}