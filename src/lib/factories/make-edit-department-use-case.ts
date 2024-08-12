import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { EditDepartmentUseCase } from "@/use-cases/departments/edit-department-use-case";

export function makeEditDepartmentUseCase() {
    const departmentsRepository = new PrismaDepartments();
    const useCase = new EditDepartmentUseCase(departmentsRepository)

    return useCase;
}