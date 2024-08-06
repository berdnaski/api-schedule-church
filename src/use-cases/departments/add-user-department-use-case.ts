import { UsersRepository } from "@/repositories/users-repository";
import { DepartmentsRepository } from "@/repositories/departments-repository";

export interface AddUserDepartmentUseCaseRequest {
    userId: string;
    departmentId: string;
}

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
        return this.usersRepository.updateDepartment(userId, departmentId);
    }
}
