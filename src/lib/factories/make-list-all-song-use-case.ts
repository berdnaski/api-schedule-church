import { PrismaSongsRepository } from "@/repositories/prisma/prisma-songs-repository";
import { ListSongUseCase } from "@/use-cases/songs/list-song-use-case";

export function makeListAllSongUseCase() {
    const songsRepository = new PrismaSongsRepository();
    return new ListSongUseCase(songsRepository);
}