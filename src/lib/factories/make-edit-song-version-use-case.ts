import { PrismaSongVersionRepository } from "@/repositories/prisma/prisma-song-version-repository";
import { EditSongVersionUseCase } from "@/use-cases/songVersion/edit-song-version-use-case";

export function makeEditSongVersionUseCase() {
    const songsRepository = new PrismaSongVersionRepository();
    return new EditSongVersionUseCase(songsRepository);
}