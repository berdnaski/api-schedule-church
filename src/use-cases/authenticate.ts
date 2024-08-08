import { InvalidCredentialsError } from "@/lib/errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { AuthenticateUseCaseRequest } from "./dtos/authenticate-dto-request";
import { AuthenticateUseCaseResponse } from "./dtos/authenticate-dto-response";


export class AuthenticateUseCase {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user,
        }
    }
}