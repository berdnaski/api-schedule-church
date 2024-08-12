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

        await this.usersRepository.updateDepartment(userId, departmentId, false);
    }
}
