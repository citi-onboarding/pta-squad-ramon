import { z } from 'zod';

export const SpeciesTypesEnum = z.enum([
  'gato',
  'cachorro',
  'porco',
  'cavalo',
  'ovelha',
  'vaca',
]);

export const CreatePatient = z.object({
  name: z.string({ required_error: 'Nome do pet é obrigatório' }),
  tutorName: z.string({ required_error: 'Nome do tutor é obrigatório' }),
  age: z.number({ required_error: 'Idade é obrigatória' }).min(0),
  species: SpeciesTypesEnum,
});

export type  CreatePatientDto= z.infer<typeof CreatePatient>;

export const UpdatePatient = z.object({
  name: z.string().optional(),
  tutorName: z.string().optional(),
  age: z.number().min(0).optional(),
  species: SpeciesTypesEnum.optional(),
});