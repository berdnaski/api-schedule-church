import { User } from "@prisma/client";

export interface RegisterUseCaseResponse {
    user: User;
}