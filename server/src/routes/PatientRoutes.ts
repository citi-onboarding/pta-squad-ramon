import { Router } from 'express';
import PatientController from '../controllers/PatientController';

const PatientRouter = Router();

PatientRouter.get('/', PatientController.findAll.bind(PatientController)); 
PatientRouter.get('/:id', PatientController.findOne.bind(PatientController));
PatientRouter.post('/', PatientController.create.bind(PatientController)); 
PatientRouter.put('/:id', PatientController.Update.bind(PatientController)); 
PatientRouter.delete('/:id', PatientController.delete.bind(PatientController));

export default PatientRouter;