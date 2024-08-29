import { DepartmentsRepository } from "@/repositories/departments-repository";

interface GetUserDepartmentUseCaseRequest {
    userId: string;
}

export class GetUserDepartmentUseCase {
    constructor(private departmentsRepository: DepartmentsRepository) {}

    async execute({ userId }: GetUserDepartmentUseCaseRequest) {
        const department = await this.departmentsRepository.findByUserId(userId);
        return department;
    }
}
