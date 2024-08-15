import { makeEditSongUseCase } from "@/lib/factories/make-edit-song-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editSong(req: FastifyRequest, reply: FastifyReply) {
    const editSongSchema = z.object({
        title: z.string().min(1).optional(),
        artist: z.string().min(1).optional(),
        genre: z.string().min(1).optional(),
    });

    try {
        const { songId } = req.params as { songId: string };
        const updateData = editSongSchema.parse(req.body);

        const editSongUseCase = makeEditSongUseCase();
        const updatedSong = await editSongUseCase.execute(songId, updateData);

        if (updatedSong) {
            reply.status(200).send(updatedSong);
        } else {
            reply.status(404).send({ message: "Song not found" });
        }
    } catch (error) {
        console.error(error);
        reply.status(400).send({ message: "Invalid request data." });
    }
}
