import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { AddUserDepartmentUseCase } from "../departments/add-user-department-use-case";

export function makeAddUserDepartmentUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const departmentsRepository = new PrismaDepartments();
    const useCase = new AddUserDepartmentUseCase(usersRepository, departmentsRepository);

    return useCase;
}
