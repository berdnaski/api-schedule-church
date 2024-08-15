import { makeDeleteSongUseCase } from "@/lib/factories/make-delete-song-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteSong(req: FastifyRequest, reply: FastifyReply) {
    const deleteSongSchema = z.object({
        songId: z.string().uuid()
    });

    try {
        const { songId } = deleteSongSchema.parse(req.params);

        const deleteSongUseCase = makeDeleteSongUseCase();

        await deleteSongUseCase.execute(songId);

        reply.status(204).send();
    } catch(error) {
        reply.status(404).send({ message: "Song not found or invalid data." });
    }
}