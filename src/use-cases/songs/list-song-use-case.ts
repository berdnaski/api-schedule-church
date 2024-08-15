import { SongsRepository } from "@/repositories/songs-repository";
import { ListSongsUseCaseResponse } from "../dtos/list-songs-use-case-dto-response";
import { SongResponseDTO } from "../dtos/song-response-dto";

export class ListSongUseCase {
    constructor(
        private songsRepository: SongsRepository
    ) {}

    async execute(): Promise<ListSongsUseCaseResponse> {
        const songs = await this.songsRepository.listAll();

        const listSongs: SongResponseDTO[] = songs.map(song => ({
            id: song.id,
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            createdAt: song.createdAt,
            updatedAt: song.updatedAt,
        }));

        return { songs: listSongs };
    }
}