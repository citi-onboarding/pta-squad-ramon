import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import prisma from "@database";

class AppointmentController implements Crud {
  constructor(private readonly citi = new Citi("Appointment")) {}
  create = async (request: Request, response: Response) => {
    const { appointmentType, doctor, date, time, description, patientId } =
      request.body;
    const isAnyUndefined = this.citi.areValuesUndefined(
      appointmentType,
      doctor,
      date,
      time,
      description,
      patientId
    );
    if (isAnyUndefined)
      return response.status(400).send("All fields are required.");

    const newAppointment = {
      appointmentType,
      doctor,
      date,
      time,
      description,
      patientId,
    };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(
      newAppointment
    );

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {
    try {
      const { httpStatus, values } = await this.citi.getAll();
      return response.status(httpStatus).send(values);
    } catch (error) {
      return response.status(500).send({ message: "Internal server error" });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);
    return response.status(httpStatus).send({ messageFromDelete });
  };

  findById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const appointmentId = parseInt(id);

      if (isNaN(appointmentId)) {
        return response.status(400).send({ message: "ID da consulta inválido." });
      }

      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: {
          patient: true,
        },
      });

      if (!appointment) {
        return response.status(404).send({ message: "Consulta não encontrada." });
      }

      return response.status(200).send(appointment);
    } catch (error) {
      console.error("Erro ao buscar consulta por ID no AppointmentController:", error);
      return response.status(500).send({ message: "Erro interno do servidor ao processar a solicitação." });
    }
  };
  
  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { appointmentType, doctor, date, time, description, patientId } =
      request.body;

    const updatedValues = {
      appointmentType,
      doctor,
      date,
      time,
      description,
      patientId,
    };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}
export default new AppointmentController();
