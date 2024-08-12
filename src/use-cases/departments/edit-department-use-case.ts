import { DepartmentsRepository } from "@/repositories/departments-repository";
import { EditDepartmentDTO } from "../dtos/edit-department-dto";

export class EditDepartmentUseCase {
    constructor(
        private departmentRepository: DepartmentsRepository
    ) {}

    async execute(departmentId: string, data: EditDepartmentDTO): Promise<void> {
        const department = await this.departmentRepository.findById(departmentId);

        if (!department) {
            throw new Error("Department not found");
        }

        await this.departmentRepository.update(departmentId, {
            name: data.name ?? department.name,
            description: data.description ?? department.description,
        });
    }
}
