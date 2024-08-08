import { User } from "@prisma/client";

export interface GetUserDashboardUseCaseResponse {
    user: User;
}