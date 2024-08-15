import { PrismaSongsRepository } from "@/repositories/prisma/prisma-songs-repository";
import { EditSongUseCase } from "@/use-cases/songs/edit-song-use-case";

export function makeEditSongUseCase() {
    const songsRepository = new PrismaSongsRepository();
    return new EditSongUseCase(songsRepository);
}