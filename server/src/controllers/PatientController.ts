import { Request, Response, NextFunction } from "express";
import { PatientRepository } from '../repositories';
import {CreatePatient, U} from '../DTO/index';

//diferenca req params (id que vem na url) e req body (dados que vem no corpo do objeto da requisição)
class PatientController {
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const patientData = CreatePatient.parse(req.body);
            const patient = await PatientRepository.create(patientData); 
            res.locals = {
                status: 201,
                message: 'Paciente criado',
                data: patient,
            };
            return next();
        } catch(error){
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const patients = await PatientRepository.findAll();
            res.locals = {
                status: 200,
                message: 'Pacients found',
                data: patients,
            };
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await PatientRepository.findOne(Number(req.params.id));
            if (!patient) {
                res.locals = {
                    status: 404,
                    message: 'Pacients not found',
                    data: null,
                };
                return next();
            }
            res.locals = {
                status: 200,
                message: 'Pacient found',
                data: patient,
            };
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) { 
        try {
            const { id } = req.params; 
            const patientData = CreatePatient.parse(req.body);
            const patientExists = await PatientRepository.findOne(Number(id));

            if (!patientExists) {
                res.locals = {
                    status: 404,
                    message: 'Pacient not found',
                    data: null,
                };
                return next();
            }
            const patient = await PatientRepository.update(Number(id), patientData);
            res.locals = {
                status: 200,
                message: 'Pacient updated',
                data: patient,
            };
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const patientExists = await PatientRepository.findOne(Number(id));
            
            if (!patientExists) {
                res.locals = {
                    status: 404,
                    message: 'Pacient not found',
                    data: null,
                };
                return next();
            }
            await PatientRepository.delete(Number(id));
            res.locals = {
                status: 204,
                message: 'Pacient deleted',
                data: null,
            };
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default new PatientController();