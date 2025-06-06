"use client";
import { BadgeCheck } from 'lucide-react';
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import { CardHistory } from "@/components/CardHistory";
import { Cat, Cachorro, Girafa, Ovelha, Porco, Cavalo } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import api from '@/services/api';

const typeColors: { [key: string]: string } = {
    "Vacinação": "bg-[#AAE1FF]",
    "Retorno": "bg-[#F29C74]",
    "Primeira Consulta": "bg-[#BFB5FF]",
    "Check-up": "bg-[#9CFF95]",
  };


  const animalImages: { [key: string]: any } = {
    "Gato": Cat,
    "Cachorro": Cachorro,
    "Porco": Porco,
    "Cavalo": Cavalo,
    "Ovelha": Ovelha,
    "Vaca": Girafa
  };

  interface SimpleAppointment { 
  id: number;
  date: string; 
  time: string; 
  appointmentTypes: string;
  description: string;
  doctor: string;
}

interface PatientWithHistory {
  id: number;
  name: string; 
  appointments: SimpleAppointment[]; 
}

interface AppointmentDetailsData {
  id: number;
  date: string; 
  time: string; 
  appointmentTypes: string;
  description: string;
  doctor: string;
  tutorName: string;
  age: number;
  species: string;

  patient: PatientWithHistory;
}

export default function AppointmentsDetails() {
  const params = useParams();
  const consultaId = params.id as string;
  console.log("ID da Consulta capturado pela rota dinâmica:", consultaId);

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  if (!consultaId) return <p>ID não encontrado na URL.</p>;
   useEffect(() => {
    if (!consultaId) {
      setLoading(false);
      setError("ID da consulta não fornecido na URL.");
      return;
    }

    const fetchAppointmentData = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await api.get(`/appointments/${consultaId}`);

        if (response.status < 200 || response.status >= 300) {
          let errorMessage = `Erro ao buscar dados: ${response.status}`;
          try {
            const errorData = response.data;
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {

          }
          throw new Error(errorMessage);
        }

        const data: AppointmentDetailsData = response.data;
        setAppointmentDetails(data);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
        console.error("Erro ao buscar detalhes da consulta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [consultaId]); 
  if (loading) {
    return <p>Carregando detalhes da consulta...</p>;
  }

  if (error) {
    return <p>Erro ao carregar consulta: {error}</p>;
  }

  if (!appointmentDetails) {
    return <p>Nenhuma informação encontrada para esta consulta.</p>;
  }

  return (
    <div className="h-screen">
      <Header />
      <div>
        <div className="flex items-center mx-[10%] my-[2%] gap-2">
          <ChevronLeft className=" w-[32px] h-[32px] text-black" />
          <h1
            className="text-4xl text-black text-[48px] font-extrabold"
            style={{ fontFamily: '"Source Code Pro", monospace' }}
          >
            Detalhes da consulta
          </h1>
        </div>
      </div>
      <div className="flex flex-row mt-12 mx-[10%] gap-8">
        {/* left side column (data) */}
        <div className="w-1/2 flex flex-col ">
          <h1 className="font-bold">Paciente</h1>
          <div className="flex flex-row">
            <div className="w-2/3  ">
              <Image src={animalImages[appointmentDetails.species]} width={295} height={295} alt="Pet" />
            </div>
            <div className="w-1/3 flex-col items-start text-left h-full flex justify-between">
              <div className=" mt-[35%]">
                <p className="font-bold">{appointmentDetails.patient.name}</p>
                <p>{appointmentDetails.age}</p> {/*Falta adicionar a idade do paciente na interface */}
              </div>
              <div>
                <p>{appointmentDetails.tutorName}</p> 
                <p>{appointmentDetails.doctor}</p>
              </div>
            </div>
          </div>
          <div className="mb-[5%] mt-[3%]">
            <h1 className="font-bold">Descrição do Problema:</h1>
            <p>
              {appointmentDetails.description}
            </p>
          </div>
          <div className="mb-[5%] border-green-400 flex flex-row">
            <p className="font-bold">Tipo de consulta:</p>
            <p className={`ml-[3%] pl-[6px] pr-[6px] border rounded-[4px] ${typeColors[appointmentDetails.appointmentTypes]}`}>{appointmentDetails.appointmentTypes}</p>
          </div>
          <div className=' mb-[10%]'>
          <div className="border border-gray-400 rounded-[16px] font-bold flex flex-col items-center text-center  p-4">
            <div className=" mb-[5%] ">
              <h1 className="mb[10%]">Deseja realizar outra consulta?</h1>
            </div>
            <Button
              className="bg-[#50E678] text-white text-base w-full h-[42px] border rounded-3xl pt-[12px] pr-[32px] pb-[12px] pl-[32px]"
              onClick={() => console.log("Funcionou")}
            >
              <BadgeCheck className='w-['/>
              Agendamento
            </Button>
          </div>
          </div>
        </div>

        {/* righht side column (History of the Appointments) */}
        <div className="w-1/2 flex flex-col content-start">
          <div className="flex flex-col transform scale-75  jus">
            <h1 className="text-lg font-bold mb-5 text-[24px] justify-start">
              Histórico de consultas
            </h1>
            <div className="border border-gray-400 p-4 rounded-[16px] overflow-y-scroll max-h-[500px] space-y-4">
              <CardHistory />
              <CardHistory />
              <CardHistory />
              <CardHistory />
              <CardHistory />
              <CardHistory />
              <CardHistory />
              <CardHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
