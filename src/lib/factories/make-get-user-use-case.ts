import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserUseCase } from "@/use-cases/users/get-user-use-case";

export function makeGetUserUseCase() {
    const userRepository = new PrismaUsersRepository();
    return new GetUserUseCase(userRepository);
}