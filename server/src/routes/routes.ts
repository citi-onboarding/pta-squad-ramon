import express from "express";
import userController from "../controllers/UserController";
import PatientController from '../controllers/PatientController';
import AppointmentController from "src/controllers/AppointmentController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.get('/patients', PatientController.get);
routes.get('/patients/:id', PatientController.findById);
routes.post('/patients', PatientController.create); 
routes.put('/patients/:id', PatientController.update); 
routes.delete('/patients/:id', PatientController.delete);

routes.get('/appointments', AppointmentController.get);
routes.get('/appointments/:id', AppointmentController.findById);
routes.post('/appointments', AppointmentController.create);
routes.put('/appointments/:id', AppointmentController.update);
routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;

