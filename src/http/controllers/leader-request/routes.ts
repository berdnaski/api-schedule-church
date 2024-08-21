import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createLeaderRequest } from "./create-leader-request";

export async function leaderRequesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);
  app.post('/leader-request', createLeaderRequest);
}
