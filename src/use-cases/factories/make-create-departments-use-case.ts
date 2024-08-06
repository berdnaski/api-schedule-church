import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { CreateDepartamentUseCase } from "../departments/create-departament-use-case";

export function makeCreateDepartmentsUseCase() {
    const departmentsRepository = new PrismaDepartments();
    const useCase = new CreateDepartamentUseCase(departmentsRepository)

    return useCase;
}