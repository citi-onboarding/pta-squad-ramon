"use client";
import { BadgeCheck } from 'lucide-react';
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import { CardHistory } from "@/components/CardHistory";
import { Cat, Cachorro, Girafa, Ovelha, Porco, Cavalo } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const typeColors: { [key: string]: string } = {
    "Vacinação": "bg-[#AAE1FF]",
    "Retorno": "bg-[#F29C74]",
    "Primeira Consulta": "bg-[#BFB5FF]",
    "Check-up": "bg-[#9CFF95]",
  };

const mockedAppointment: {[key:string]: any} = {
    doctor: "Dr. José Carlos",
    appointmentType: "Check-up",
    description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    patient:"Luna",
    tutorName:"Lucas Gomes",
    age:"5 anos",
    species:"Gato",

}
  const animalImages: { [key: string]: any } = {
    "Gato": Cat,
    "Cachorro": Cachorro,
    "Porco": Porco,
    "Cavalo": Cavalo,
    "Ovelha": Ovelha,
    "Vaca": Girafa
  };


export default function AppointmentsDetails() {
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
              <Image src={animalImages[mockedAppointment.species]} width={295} height={295} alt="Pet" />
            </div>
            <div className="w-1/3 flex-col items-start text-left h-full flex justify-between">
              <div className=" mt-[35%]">
                <p className="font-bold">{mockedAppointment.patient}</p>
                <p>{mockedAppointment.age}</p>
              </div>
              <div>
                <p>{mockedAppointment.tutorName}</p> {/*Inserts tutorName and doctor variables */}
                <p>{mockedAppointment.doctor}</p>
              </div>
            </div>
          </div>
          <div className="mb-[5%] mt-[3%] border-yellow-400">
            <h1 className="font-bold">Descrição do Problema:</h1>
            <p>
              {mockedAppointment.description}
            </p>
          </div>
          <div className="mb-[5%] border-green-400 flex flex-row">
            <p className="font-bold">Tipo de consulta:</p>
            <p className={`ml-[3%] pl-[6px] pr-[6px] border rounded-[4px] ${typeColors[mockedAppointment.appointmentType]}`}>{mockedAppointment.appointmentType}</p>
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
