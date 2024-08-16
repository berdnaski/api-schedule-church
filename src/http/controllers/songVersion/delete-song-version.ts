import { makeDeleteSongVersionUseCase } from "@/lib/factories/make-delete-song-version-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteSongVersion(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const deleteSongVersionSchema = z.object({
        songVersionId: z.string().uuid()
    });

    try {
        const { songVersionId } = deleteSongVersionSchema.parse(req.params);
        const deleteSongVersionUseCase = makeDeleteSongVersionUseCase();

        await deleteSongVersionUseCase.execute(songVersionId);

        reply.status(204).send();
    } catch (error) {
        console.error(error);
        reply.status(404).send({ message: "Song version not found or invalid data." });
    }
}
