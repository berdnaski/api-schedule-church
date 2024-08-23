// src/http/controllers/leader-requests/routes.ts

import { FastifyInstance } from "fastify";
import { createLeaderRequest } from "./create-leader-request";
import { updateLeaderRequest } from "./update-leader-request";
import { verifyUserRole } from "@/http/middlewares/veriffy-user-role";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { listLeaderRequests } from "./list-leader-request";

export async function leaderRequestRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT); 

  app.get(
    "/leader-requests",
    { onRequest: [verifyUserRole("ADMIN")] },
    listLeaderRequests
  );

  app.post("/leader-requests", createLeaderRequest);
  app.put(
    "/leader-requests/:id/:isAccepted",
    { onRequest: [verifyUserRole("ADMIN")] },
    updateLeaderRequest
  );
}
