import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { DeleteDepartamentUseCase } from "@/use-cases/departments/delete-department-use-case";

export function makeDeleteDepartmentUseCase() {
    const departmentsRepository = new PrismaDepartments();
    return new DeleteDepartamentUseCase(departmentsRepository)
}