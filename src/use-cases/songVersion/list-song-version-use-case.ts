import { SongVersion } from '@prisma/client';
import { SongVersionRepository } from './../../repositories/song-version-repository';
import { ListSongVersionUseCaseDTOResponse } from '../dtos/list-song-version-use-case-dto-response';
import { SongVersionResponseDTO } from '../dtos/song-version-response-dto';

export class ListSongVersionUseCase {
    constructor(
        private songsRepository: SongVersionRepository
    ) {}

    async execute(): Promise<ListSongVersionUseCaseDTOResponse> {
        const songsVersion = await this.songsRepository.listAll();

        const listSongsVersion: SongVersionResponseDTO[] = songsVersion.map(songVersion => ({
            songVersionId: songVersion.id,  
            version_name: songVersion.version_name,
            songId: songVersion.songId,
            classification: songVersion.classification,
            key: songVersion.key,
            link_chord: songVersion.link_chord,
            link_video: songVersion.link_video,
            createdAt: songVersion.createdAt,
            updatedAt: songVersion.updatedAt
        }));

        return { songsVersion: listSongsVersion };
    }
}
