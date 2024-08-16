import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createSong } from "./create-songs";
import { deleteSong } from "./delete-song";
import { editSong } from "./edit-songs";
import { listAllSongs } from "./list-songs";
import { getSong } from "./songs";

export async function songsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
    // Authenticated
    app.post('/songs', createSong);
    app.delete('/songs/:songId', deleteSong);
    app.put('/songs/:songId', editSong);
    app.get('/songs', listAllSongs);
    app.get('/songs/:songId', getSong);
}