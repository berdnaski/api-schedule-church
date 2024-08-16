import { PrismaSongVersionRepository } from "@/repositories/prisma/prisma-song-version-repository";
import { CreateSongVersionUseCase } from "@/use-cases/songVersion/create-song-version-use-case";

export function makeCreateSongVersionUseCase() {
    const songVersionRepository = new PrismaSongVersionRepository();
    return new CreateSongVersionUseCase(songVersionRepository);
}
