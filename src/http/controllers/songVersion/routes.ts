import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSongVersion } from "./create-song-version";
import { deleteSongVersion } from "./delete-song-version";
import { editSongVersion } from "./edit-song-version";
import { listSongsVersion } from "./list-songs-version";
import { getSongVersion } from "./song-version";

export async function songsVersionRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.post('/songs/:songId/versions', createSongVersion);
    app.delete('/songs/versions/:songVersionId', deleteSongVersion);
    app.put('/songs/:songId/versions/:songVersionId', editSongVersion);
    app.get('/songs/versions/', listSongsVersion);
    app.get('/songs/versions/:songVersionId', getSongVersion);
}
