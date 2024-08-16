import { makeCreateSongVersionUseCase } from "@/lib/factories/make-create-song-version-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSongVersion(req: FastifyRequest, reply: FastifyReply) {
    const createSongVersionSchema = z.object({
        version_name: z.string().min(1),
        classification: z.string(),
        key: z.string(),
        link_chord: z.string().min(1),
        link_video: z.string().min(1),
    });

    try {
        const { songId } = req.params as { songId: string };
        const { version_name, classification, key, link_chord, link_video } = createSongVersionSchema.parse(req.body);

        const createSongVersionUseCase = makeCreateSongVersionUseCase();
        const version = await createSongVersionUseCase.execute({
            song: { connect: { id: songId } },
            version_name,
            classification,
            key,
            link_chord,
            link_video
        });

        reply.status(201).send(version);
    } catch (error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}
