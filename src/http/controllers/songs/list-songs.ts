import { makeListAllSongUseCase } from "@/lib/factories/make-list-all-song-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listAllSongs(req: FastifyRequest, reply: FastifyReply) {
    try {
        const listAllSongsUseCase = makeListAllSongUseCase();
        const { songs } = await listAllSongsUseCase.execute();

        return reply.status(200).send({ songs });
    } catch(error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}