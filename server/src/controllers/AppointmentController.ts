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
      const appointmentsComPacientes = await prisma.appointment.findMany({
        include: {
          patient: {
            select: {
              name: true,
              tutorName: true,
              species: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      });

      const dadosFormatados = appointmentsComPacientes.map((app) => ({
        id: app.id,
        date: app.date,
        appointmentType: app.appointmentType,
        doctor: app.doctor,
        description: app.description,
        name: app.patient.name,
        tutorName: app.patient.tutorName,
        species: app.patient.species,
      }));

      return response.status(200).send(dadosFormatados);
    } catch (error) {
      console.error("Erro ao buscar agendamentos com pacientes:", error);
      return response
        .status(500)
        .send({ message: "Erro interno do servidor." });
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
        return response
          .status(400)
          .send({ message: "ID da consulta inválido." });
      }

      const appointmentDetails = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: {
          patient: {
            // Inclui o paciente
            include: {
              appointments: {
                // E AQUI, inclui TODOS os appointments desse paciente
                orderBy: [
                  // Opcional: para ordenar o histórico
                  { date: "desc" },
                  { time: "desc" },
                ],
              },
            },
          },
        },
      });

      if (!appointmentDetails) {
        return response
          .status(404)
          .send({ message: "Consulta não encontrada." });
      }

      // Agora, appointmentDetails.patient.appointments conterá o histórico
      return response.status(200).send(appointmentDetails);
    } catch (error) {
      console.error(
        "Erro ao buscar consulta por ID com histórico no AppointmentController:",
        error
      );
      return response
        .status(500)
        .send({
          message: "Erro interno do servidor ao processar a solicitação.",
        });
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
