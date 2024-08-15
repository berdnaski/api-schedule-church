import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateSongUseCase } from "@/lib/factories/make-create-song-use-case";

export async function createSong(req: FastifyRequest, reply: FastifyReply) {
    const createSongSchema = z.object({
        title: z.string().min(1),
        artist: z.string().min(1),
        genre: z.string().min(1),
    });

    try {
        const { title, artist, genre } = createSongSchema.parse(req.body);

        const createSongUseCase = makeCreateSongUseCase();
        const song = await createSongUseCase.execute({
            title,
            artist,
            genre,
        });

        reply.status(201).send(song);
    } catch (error) {
        reply.status(400).send();
    }
}
