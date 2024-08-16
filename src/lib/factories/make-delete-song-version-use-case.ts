import { PrismaSongVersionRepository } from "@/repositories/prisma/prisma-song-version-repository";
import { DeleteSongVersionUseCase } from "@/use-cases/songVersion/delete-song-version-use-case";

export function makeDeleteSongVersionUseCase() {
    const songsVersionRepository = new PrismaSongVersionRepository();
    return new DeleteSongVersionUseCase(songsVersionRepository);
}