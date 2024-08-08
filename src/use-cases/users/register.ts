import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "@/lib/errors/user-already-exists-error";
import { RegisterUseCaseRequest } from "../dtos/register-dto-request";
import { RegisterUseCaseResponse } from "../dtos/register-dto-response";

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
        if(userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }
    
       const user = await this.usersRepository.create({
        name,
        email,
        password_hash,
       })

       return {
            user,
       }
    }
}