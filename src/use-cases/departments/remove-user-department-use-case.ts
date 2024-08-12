import { UsersRepository } from "@/repositories/users-repository";
import { DepartmentsRepository } from "@/repositories/departments-repository";

export class RemoveUserDepartmentUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private departmentsRepository: DepartmentsRepository,
    ) {}

    async execute(userId: string, departmentId: string): Promise<void> {
        const user = await this.usersRepository.findById(userId);
        const department = await this.departmentsRepository.findById(departmentId);

        if (!user || !department) {
            throw new Error("User or department not found");
        }

        const isAssociated = user.departments.some(dept => dept.id === departmentId);

        if (!isAssociated) {
            throw new Error("User is not associated with the department");
        }

        await this.usersRepository.updateDepartment(userId, departmentId, false);
    }
}
