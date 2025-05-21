import prisma from "@database";
import { Prisma, Patient } from "@prisma/client";

// No prisma vou criar um relatório com esse dado que está passando, resposta em user
class PatientRepository {
    async findAll(): Promise<Patient[]> {
        const patients = await prisma.patient.findMany();
        return patients;
    }

    async findOne(id: string): Promise<Patient | null> {
        const patient = await prisma.patient.findUnique({ where: { id } });
        return patient;
    }

    async create(data: Prisma.PatientCreateInput): Promise<Patient> {
        const patient = await prisma.patient.create({ data });
        return patient;
    }

    async update(id: string, data: Prisma.PatientUpdateInput): Promise<Patient> {
        const patient = await prisma.patient.update({ where: { id }, data });
        return patient;
    }

    async delete(id: string): Promise<Patient> {
        const patient = await prisma.patient.delete({ where: { id } });
        return patient;
    }
}

export default new PatientRepository();