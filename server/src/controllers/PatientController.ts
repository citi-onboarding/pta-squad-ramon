import { Request, Response, NextFunction } from "express";
import { Citi, Crud } from "../global";
import prisma from "@database";

class PatientController implements Crud {
  constructor(private readonly citi = new Citi("Patient")) {}
  create = async (request: Request, response: Response) => {
    try {
      const { name, tutorName, age, species } = request.body;

      // 1. VALIDAÇÃO (Opcional, mas recomendado)
      // Se a sua função this.citi.areValuesUndefined for acessível, você pode usá-la.
      // Caso contrário, faça uma verificação simples:
      if (!name || !tutorName || !age || !species) {
        return response
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      }

      // 2. USAR O PRISMA DIRETAMENTE NO CONTROLLER
      // Estamos chamando prisma.patient.create em vez de this.citi.insertIntoDatabase
      const novoPacienteSalvo = await prisma.patient.create({
        data: {
          name,
          tutorName,
          age,
          species,
        },
      });

      // 3. RETORNAR O OBJETO COMPLETO QUE O PRISMA NOS DEU
      // 'novoPacienteSalvo' já contém o ID e todos os outros campos.
      return response.status(201).json(novoPacienteSalvo);
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      return response
        .status(500)
        .json({ message: "Erro interno no servidor ao criar o paciente." });
    }
  };

  get = async (request: Request, response: Response) => {
    try {
      const { httpStatus, values } = await this.citi.getAll();
      return response.status(httpStatus).send(values);
    } catch (error) {
      return response.status(500).send({ message: "Internal server error" });
    }
  };

  findById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { httpStatus, value } = await this.citi.findById(id);
      return response.status(httpStatus).send(value);
    } catch (error) {
      return response.status(500).send({ message: "Internal server error" });
    }
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, tutorName, age, species } = request.body;
    const updatedValues = { name, tutorName, age, species };
    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);
    return response.status(httpStatus).send({ messageFromDelete });
  };
}
export default new PatientController();
