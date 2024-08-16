import { PrismaSongVersionRepository } from "@/repositories/prisma/prisma-song-version-repository";
import { songVersionUseCase } from "@/use-cases/songVersion/song-version-use-case";

export function makeSongVersionUseCase() {
    const songsVersionRepository = new PrismaSongVersionRepository();
    return new songVersionUseCase(songsVersionRepository);
}