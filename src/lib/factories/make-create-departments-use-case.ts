import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { CreateDepartamentUseCase } from "@/use-cases/departments/create-department-use-case";

export function makeCreateDepartmentsUseCase() {
    const departmentsRepository = new PrismaDepartments();
    const useCase = new CreateDepartamentUseCase(departmentsRepository)

    return useCase;
}