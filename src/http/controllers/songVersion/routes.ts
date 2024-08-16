import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSongVersion } from "./create-song-version";

export async function songsVersionRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    // Authenticated
    app.post('/songs/:songId/versions', createSongVersion);
}