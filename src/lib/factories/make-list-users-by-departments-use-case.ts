import { PrismaDepartments } from "@/repositories/prisma/prisma-departments-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ListUsersByDepartmentUseCase } from "@/use-cases/departments/list-user-by-department-use-case";

export function makeListUsersByDepartmentUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const departmentsRepository = new PrismaDepartments();
    return new ListUsersByDepartmentUseCase(usersRepository, departmentsRepository);
}
