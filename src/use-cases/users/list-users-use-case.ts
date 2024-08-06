import { UsersRepository } from "@/repositories/users-repository";
import { UserResponse } from "../interfaces/user-response";


export interface ListUsersUseCaseResponse {
    users: UserResponse[];
}

export class ListUsersUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.listAll();
        

        const listUsers: UserResponse[] = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.departmentId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        return { users: listUsers }
    }
}