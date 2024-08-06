import { DepartmentsRepository } from "@/repositories/departments-repository";

export interface CreateDepartamentUseCaseRequest {
    name: string;
    description: string;
}

export class CreateDepartamentUseCase {
    constructor(
        private departmentsRepository: DepartmentsRepository
    ) {}

    async execute({ name, description }: CreateDepartamentUseCaseRequest) {
        return this.departmentsRepository.create({
            name,
            description,
        })
    }
}