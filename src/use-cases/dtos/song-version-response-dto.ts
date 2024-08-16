export interface SongVersionResponseDTO {
    songVersionId: string;
    version_name: string;
    songId: string;
    classification: string;
    key: string;
    link_chord: string;
    link_video: string;
    createdAt: Date;
    updatedAt: Date;
}