import { UsersRepository } from "@/repositories/users-repository";
import { DepartmentsRepository } from "@/repositories/departments-repository";
import { AddUserDepartmentUseCaseRequest } from "../dtos/add-user-department-dto-request";

export class AddUserDepartmentUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private departmentsRepository: DepartmentsRepository
    ) {}

    async execute({ userId, departmentId }: AddUserDepartmentUseCaseRequest) {
        const department = await this.departmentsRepository.findById(departmentId);
        if (!department) {
            throw new Error("Department not found");
        }

        const user = await this.usersRepository.updateDepartment(userId, departmentId, true);

        if (!user) {
            throw new Error("User not found");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: department.name,
        };
    }
}
