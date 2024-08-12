import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RemoveUserDepartmentUseCase } from "@/use-cases/departments/remove-user-department-use-case";
import { RegisterUseCase } from "@/use-cases/users/register";

export function makeRemoveUserDepartmentUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const departmentRepository = new PrismaDepartments();
    
    const useCase = new RemoveUserDepartmentUseCase(usersRepository, departmentRepository);

    return useCase;
}