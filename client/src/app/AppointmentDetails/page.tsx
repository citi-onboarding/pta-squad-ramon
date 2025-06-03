"use client";
import { BadgeCheck } from 'lucide-react';
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import { CardHistory } from "@/components/CardHistory";
import { Cat } from "@/assets";
import Image from "next/image";
import { BotaoAcao } from "@/components/Buttons";
import { Button } from "@/components/ui/button";

export default function AppointmentsDetails() {
  return (
    <div className="h-screen border border-green-400">
      <Header />
      <div className="border border-pink-400">
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
      <div className="flex flex-row mt-12 mx-[10%] gap-8 border border-purple-400">
        {/* left side column (data) */}
        <div className="w-1/2 flex flex-col border border-red-400">
          <h1 className="font-bold">Paciente</h1>
          <div className="flex flex-row border border-blue-400">
            <div className="w-2/3  border border-yellow-400 ">
              <Image src={Cat} width={295} height={295} alt="Pet" />
            </div>
            <div className="w-1/3 flex flex-col items-start text-left h-full border-orange-400 flex justify-between">
              <div className=" border border-amber-700 mt-[35%]">
                <p className="font-bold">Luna</p>
                <p>5 anos</p>
              </div>
              <div className="border border-red-600">
                <p>Lucas Gomes</p>
                <p>Dr. José Carlos</p>
              </div>
            </div>
          </div>
          <div className="mb-[5%] border-yellow-400">
            <h1 className="font-bold">Descrição do Problema:</h1>
            <p>
              Três Anéis para os Reis-Elfos sob este céu; Sete para os
              Senhores-Anões em seus rochosos corredores; Nove para os Homens
              Mortais fadados a morrer; Um para o Senhor do Escuro em seu Escuro
              Trono, Na terra de Mordor, onde as Sombras se deitam. Um Anel para
              a todos governar, Um Anel para encontrá-los, Um Anel para a todos
              trazer e na Escuridão aprisioná-los, Na terra de Mordor, onde as
              Sombras se deitam.
            </p>
          </div>
          <div className="mb-[5%] border-yellow-400">
            <p className="font-bold">Tipo de consulta:</p>
          </div>
          <div className="border border-gray-400 rounded-[16px] font-bold flex flex-col items-center text-center p-4">
            <div className="border border-gray-400 mb-[5%] ">
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

        {/* righht side column (History of the Appointments) */}
        <div className="w-1/2 flex flex-col content-start">
          <div className="flex flex-col justify-center transform scale-75 border border-gray-800">
            <h1 className="text-lg font-bold mb-5 text-[24px]">
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
