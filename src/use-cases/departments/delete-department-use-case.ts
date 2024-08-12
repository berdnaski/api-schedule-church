import { DepartmentsRepository } from "@/repositories/departments-repository";

export class DeleteDepartamentUseCase {
    constructor(
        private departmentsRepository: DepartmentsRepository
    ) {}

    async execute(departmentId: string) {
        const department = await this.departmentsRepository.findById(departmentId);

        if(!department) {
            throw new Error("Department not found");
        }

        await this.departmentsRepository.delete(departmentId);
    }
}