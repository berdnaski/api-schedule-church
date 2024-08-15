import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSong } from "./create-songs";
import { deleteSong } from "./delete-song";

export async function songsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated
    app.post('/songs', createSong);
    app.delete('/songs/:songId', deleteSong);
}