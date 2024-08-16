import { makeSongUseCase } from "@/lib/factories/make-song-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getSong(req: FastifyRequest, reply: FastifyReply) {
    const { songId } = req.params as { songId: string };

    try {
        const songUseCase = makeSongUseCase();
        const song = await songUseCase.execute(songId);

        reply.status(200).send(song);
    } catch(error) {
        reply.status(404).send({ message: "Song not found." });
    }
}