import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserDashboardUseCase } from '@/use-cases/users/get-user-dashboard';

export function makeGetUserUseCase() {
    const usersRepository = new PrismaUsersRepository(); 
    return new GetUserDashboardUseCase(usersRepository);
}
