import { makeEditSongVersionUseCase } from "@/lib/factories/make-edit-song-version-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editSongVersion(req: FastifyRequest, reply: FastifyReply) {
    const editSongVersionSchema = z.object({
        version_name: z.string().min(1).optional(),
        classification: z.string().min(1).optional(),
        key: z.string().min(1).optional(),
        link_chord: z.string().url().optional(),
        link_video: z.string().url().optional(),
    });

    try {
        const { songVersionId } = req.params as { songVersionId: string };

        if (typeof req.body !== 'object' || req.body === null || Object.keys(req.body).length === 0) {
            return reply.status(400).send({ message: "No data provided for update." });
        }

        const updateData = editSongVersionSchema.parse(req.body);

        const editSongVersionUseCase = makeEditSongVersionUseCase();
        const updatedVersion = await editSongVersionUseCase.execute(songVersionId, updateData);

        if (updatedVersion) {
            reply.status(200).send(updatedVersion);
        } else {
            reply.status(404).send({ message: "Song version not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}
