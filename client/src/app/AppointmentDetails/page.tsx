'use client'
import Header from '@/components/Header';
import { CardHistory } from '@/components/CardHistory';
import { Cat } from "@/assets";
import Image from 'next/image';

export default function AppointmentsDetails() {
  return (
    <div className="h-screen">
      <Header />
      <div>
        <h1
          className="text-4xl text-black text-[48px] mx-[10%] my-[2%] font-extrabold"
          style={{ fontFamily: '"Source Code Pro", monospace' }}
        >
          Detalhes da consulta
        </h1>
      </div>
      <div className="flex flex-row mt-12 mx-[10%] gap-8">
        {/* left side column (data) */}
        <div className="w-1/2 flex flex-col">
          <h1 className='font-bold'>Paciente</h1>
          <div className='flex flex-row'>
            <div className="w-2/3">
              <Image src={Cat} width={295} height={295} alt="Pet" />
            </div>
            <div className="w-1/3 flex flex-col justify-between items-start text-left h-full">
            <div className="my-[50%]">
              <p className="font-bold">Luna</p>
              <p>5 anos</p>
            </div>
            <div>
              <p>Lucas Gomes</p>
              <p>Dr. José Carlos</p>
            </div>
          </div>
          </div>
          <div>
            <h1 className="font-bold">Descrição do Problema:</h1>
            <p>Três Anéis para os Reis-Elfos sob este céu;
  Sete para os Senhores-Anões em seus rochosos corredores;
  Nove para os Homens Mortais fadados a morrer;
  Um para o Senhor do Escuro em seu Escuro Trono,
  Na terra de Mordor, onde as Sombras se deitam.
  Um Anel para a todos governar, Um Anel para encontrá-los,
  Um Anel para a todos trazer e na Escuridão aprisioná-los,
  Na terra de Mordor, onde as Sombras se deitam.</p>
          </div>
        </div>

        {/* righht side column (History of the Appointments) */}
        <div className="w-1/2 flex flex-col content-start">
          <div className="flex flex-col justify-center transform scale-75">
            <h1 className="text-lg font-bold mb-5 text-[24px]">
              Histórico de consultas
            </h1>
            <div className="border border-gray-400 p-4 rounded-md space-y-4">
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