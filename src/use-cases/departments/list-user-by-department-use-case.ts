import { UserDTO } from "../dtos/user-dto";
import { UsersRepository } from "@/repositories/users-repository";
import { DepartmentsRepository } from "@/repositories/departments-repository";

export class ListUsersByDepartmentUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private departmentsRepository: DepartmentsRepository,
    ) {}

    async execute(departmentId: string): Promise<UserDTO[]> {
        const department = await this.departmentsRepository.findById(departmentId);

        if (!department) {
            throw new Error("Department not found");
        }

        const users = await this.usersRepository.listByDepartment(departmentId);

        const userDTOs: UserDTO[] = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        return userDTOs;
    }
}
