
import { DepartmentsRepository } from '@/repositories/departments-repository';
import { PrismaDepartments } from '@/repositories/prisma/prisma-departments-repository';
import { GetUserDepartmentUseCase } from '@/use-cases/departments/get-user-department-use-case';

export function makeGetUserDepartmentUseCase() {
    const departmentsRepository = new PrismaDepartments();
    const useCase = new GetUserDepartmentUseCase(departmentsRepository);

    return useCase;
}
