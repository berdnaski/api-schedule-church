import { makeSongVersionUseCase } from "@/lib/factories/make-song-version-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getSongVersion(req: FastifyRequest, reply: FastifyReply) {
    const { songVersionId } = req.params as { songVersionId: string };

    try {
        const songsVersionUseCase = makeSongVersionUseCase();
        const songVersion = await songsVersionUseCase.execute(songVersionId);

        reply.status(200).send(songVersion);
    } catch(errror) {
        reply.status(404).send({ message: "Song version not found." });
    }
}