import { DepartmentsRepository } from "@/repositories/departments-repository";
import { CreateDepartamentUseCaseRequest } from "../dtos/create-department-dto-request";

export class CreateDepartamentUseCase {
    constructor(
        private departmentsRepository: DepartmentsRepository
    ) {}

    async execute({ name, description, userId, role }: CreateDepartamentUseCaseRequest) {
        if(role !== "ADMIN" && role !== "LEADER") {
            throw new Error("Você não tem permissão para criar um departamento.");
        }

        const existingDepartment = await this.departmentsRepository.findByUserId(userId);
        if(existingDepartment) {
            throw new Error("Você já possui um departamento associado a você.");
        }

        return this.departmentsRepository.create({
            name,
            description,
            user: {
                connect: { id: userId }
            }
        });
    }
}
