import { User } from "@prisma/client";

export interface AuthenticateUseCaseResponse {
    user: User;
}