import { Router } from 'express';
import PatientRouter from './PatientRoutes';

const router = Router();

router.use('/patients', PatientRouter); //usa o prefixo /patients para todas as rotas do PatientRouter

export default router;