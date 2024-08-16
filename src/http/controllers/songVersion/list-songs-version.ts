import { makeListSongsVersionUseCase } from "@/lib/factories/make-list-songs-version-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listSongsVersion(req: FastifyRequest, reply: FastifyReply) {
    try {
        const listAllSongsVersionUseCase = makeListSongsVersionUseCase();
        const { songsVersion } = await listAllSongsVersionUseCase.execute();

        return reply.status(200).send({ songsVersion });
    } catch(error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}