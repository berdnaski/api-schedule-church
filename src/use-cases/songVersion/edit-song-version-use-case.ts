// edit-song-version-use-case.ts
import { SongVersion } from "@prisma/client";
import { SongVersionRepository } from "@/repositories/song-version-repository";
import { EditSongVersionDTO } from "../dtos/edit-song-version-dto";

export class EditSongVersionUseCase {
    constructor(
        private songVersionRepository: SongVersionRepository
    ) {}

    async execute(id: string, data: EditSongVersionDTO): Promise<SongVersion | null> {
        const songVersion = await this.songVersionRepository.findById(id);
        if (!songVersion) {
            return null; 
        }

        if (data.version_name && data.version_name.trim().length === 0) {
            throw new Error("Invalid version name");
        }
        
        if (data.classification && data.classification.trim().length === 0) {
            throw new Error("Invalid classification");
        }
        
        if (data.key && data.key.trim().length === 0) {
            throw new Error("Invalid key");
        }
        
        if (data.link_chord && !this.isValidUrl(data.link_chord)) {
            throw new Error("Invalid chord link URL");
        }

        if (data.link_video && !this.isValidUrl(data.link_video)) {
            throw new Error("Invalid video link URL");
        }

        return this.songVersionRepository.update(id, data);
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }
}
