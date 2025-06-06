'use client'
import { useState } from 'react';
import Button from '@/components/Buttons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button as ButtonComponent } from '@/components/ui/button';
import Image from 'next/image';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogoCITipet } from '@/assets';
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { cn } from '@/lib/utils';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from '@/services/api';
import { time } from 'console';


// 1. SCHEMA REVERTIDO PARA VALIDAR A DATA COMO STRING 'dd/mm/aa'
const formSchema = z.object({
  tipoConsulta: z.string().min(1, { message: 'Tipo de consulta é obrigatório' }),
  medicoResponsavel: z.string().min(1, { message: 'Médico responsável é obrigatório' }),
  dataAtendimento: z.string().min(1, { message: 'Data de atendimento é obrigatória' })
    .regex(/^\d{2}\/\d{2}\/\d{2}$/, { message: 'Data deve estar no formato dd/mm/aa' }),
  horaAtendimento: z.string().min(1, { message: 'Hora de atendimento é obrigatória' })
    .regex(/^\d{2}:\d{2}$/, { message: 'Hora deve estar no formato hh:mm' }),
  descricao: z.string().min(1, { message: 'Descrição do problema é obrigatória' }),
});

type FormData = z.infer<typeof formSchema>;

interface ModalProps {
  onClose: () => void;
  patientId: string | number;
  patientDisplayName?: string;
}

export default function ModalConsulta({onClose, patientId, patientDisplayName}: ModalProps) {

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoConsulta: '',
      medicoResponsavel: '',
      dataAtendimento: '',
      horaAtendimento: '',
      descricao: '',
    },
  });

  // 2. RE-ADICIONADO O ESTADO LOCAL PARA CONTROLAR A SELEÇÃO NO CALENDÁRIO
  const [date, setDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // 4. PAYLOAD DE ENVIO AJUSTADO PARA USAR 'date' E 'time'
  const onSubmitAppointment = async (data: FormData) => {
    console.log("Dados da consulta:", data);
    setIsLoading(true);

    // Combine date and time into a single Date object
    let appointmentDateTime: Date | null = null;
    try {
      const [day, month, year] = data.dataAtendimento.split('/');
      const [hour, minute] = data.horaAtendimento.split(':');
      appointmentDateTime = new Date(
        2000 + parseInt(year, 10), // assumes year is 'yy'
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10)
      );
    } catch (e) {
      alert("Data ou hora inválida.");
      setIsLoading(false);
      return;
    }

    const appointmentPayload = {
      patientId: patientId,
      appointmentType: data.tipoConsulta,
      doctor: data.medicoResponsavel,
      date: appointmentDateTime.toISOString(), // Campo 'time' com a string "hh:mm"
      time: data.horaAtendimento, // Campo 'time' com a string "hh:mm"
      description: data.descricao,
    };

    console.log("Payload da consulta:", appointmentPayload);
    try{
        await api.post('/appointments', appointmentPayload);
        
        alert(`Consulta para ${patientDisplayName || 'o paciente'} agendada com sucesso!`);
        reset();
        onClose();

    } catch (error: any) {
        console.error("Erro ao agendar consulta:", error);
        let errorMessage = "Falha ao agendar a consulta.";
        if (error.response?.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
          alert(`Erro: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-10">
      <Card className={cn("rounded-2xl px-12 py-12 w-full max-w-[824px] shadow-xl relative bg-white")}>
        
        <div className='flex justify-end'>
          <button onClick={onClose} className='absolute top-4 right-4 text-2xl font-bold'>&times;</button>
        </div>

        <div className='flex justify-center mb-8'>
          <Image src={LogoCITipet} alt="Logo" width={189} height={74} />
        </div>
        <h3 className='text-center text-[16px] font-bold mb-9'>O pet já está cadastrado no sistema! <span className='font-medium'>Preencha os dados da </span>consulta </h3>

        <form className='grid grid-cols-1 md:grid-cols-2 gap-6' onSubmit={handleSubmit(onSubmitAppointment)}>

          {/* CAMPO TIPO DE CONSULTA */}
          <div className="flex flex-col">
            <Label className="font-bold mb-3">Tipo de consulta</Label>
            <Controller
              name="tipoConsulta"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-black p-2 text-black">
                    <SelectValue placeholder="Selecione aqui" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="primeira">Primeira Consulta</SelectItem>
                      <SelectItem value="retorno">retorno</SelectItem>
                      <SelectItem value="check-up">Check-up</SelectItem>
                      <SelectItem value="vacinacao">Vacinação</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipoConsulta && <p className="text-red-500 text-sm mt-1">{errors.tipoConsulta.message}</p>}
          </div>

          {/* CAMPO MÉDICO RESPONSÁVEL */}
          <div className="flex flex-col">
            <Label className="font-bold mb-3">Médico Responsável</Label>
            <Controller
              name="medicoResponsavel"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full border border-black p-2 text-black">
                    <SelectValue placeholder="Selecione aqui" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Dr Carlos">Dr. Carlos Eduardo Silva</SelectItem>
                      <SelectItem value="Dr Ana Beatriz">Dra. Ana Beatriz Oliveira</SelectItem>
                      <SelectItem value="Dr Roberto">Dr. Roberto Lima</SelectItem>
                      <SelectItem value="Dra Fernanda">Dra. Fernanda Costa</SelectItem>
                      <SelectItem value="Dr Miguel">Dr. Miguel Santos Pereira</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.medicoResponsavel && <p className="text-red-500 text-sm mt-1">{errors.medicoResponsavel.message}</p>}
          </div>
          
          {/* 3. LÓGICA DO CALENDÁRIO AJUSTADA */}
          <div className='flex flex-col'>
            <Label className='font-bold mb-3'>Data do atendimento</Label>
            <Controller
              control={control}
              name="dataAtendimento"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonComponent
                      variant={"outline"}
                      className={cn(
                        "w-full border border-black p-2 text-black justify-between text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? field.value : <span>dd/mm/aa</span>}
                      <CalendarIcon className="h-4 w-4" />
                    </ButtonComponent>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          const formatted = format(selectedDate, 'dd/MM/yy');
                          field.onChange(formatted);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.dataAtendimento && <p className="text-red-500 text-sm mt-1">{errors.dataAtendimento.message}</p>}
          </div>
          
          {/* CAMPO HORÁRIO DO ATENDIMENTO */}
          <div className='flex flex-col'>
            <Label htmlFor='horaAtendimento' className='font-bold mb-3'>Horário do atendimento</Label>
            <div className='relative'>
              <Input
                id='horaAtendimento'
                type="text"
                placeholder="HH:MM"
                {...register('horaAtendimento')}
                className="w-full border border-black p-2 text-black"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black h-[18px] w-[18px]" />
            </div>
            {errors.horaAtendimento && <p className="text-red-500 text-sm mt-1">{errors.horaAtendimento.message}</p>}
          </div>

          {/* CAMPO DESCRIÇÃO DO PROBLEMA */}
          <div className='col-span-2 w-full'>
            <div className='mb-2'>
              <Label htmlFor="descricao" className="font-bold mb-2">Descrição do Problema</Label>
            </div>
            <Input
              id="descricao"
              {...register('descricao')}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>}
          </div>

          <div className="mt-5 col-span-2 flex justify-center">
            <Button
              texto="Finalizar Cadastro"
              cor="bg-[#50E678]" onClick={undefined}            />
          </div>
        </form>
      </Card>
    </div>
  );
}