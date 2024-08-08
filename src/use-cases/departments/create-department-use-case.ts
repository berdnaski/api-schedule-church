import { DepartmentsRepository } from "@/repositories/departments-repository";
import { CreateDepartamentUseCaseRequest } from "../dtos/create-department-dto-request";

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