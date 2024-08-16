import { PrismaSongVersionRepository } from "@/repositories/prisma/prisma-song-version-repository";
import { ListSongVersionUseCase } from "@/use-cases/songVersion/list-song-version-use-case";

export function makeListSongsVersionUseCase() {
    const songsVersionRepository = new PrismaSongVersionRepository();
    return new ListSongVersionUseCase(songsVersionRepository);
}