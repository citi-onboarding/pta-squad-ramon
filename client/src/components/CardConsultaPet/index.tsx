'use client'
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Gato, Cachorro, Girafa, Ovelha, Porco, Cavalo } from "@/assets"
import { getAllAppointments } from "@/services/CardPet/index"
import { useEffect, useState } from "react"

function getImagemPet(especie: string) {
    switch (especie.toLowerCase()) {
        case 'gato':
            return Gato;
        case 'cachorro':
            return Cachorro;
        case 'girafa':
            return Girafa;
        case 'cavalo':
            return Cavalo;
        case 'porco':
            return Porco;
        case 'ovelha':
            return Ovelha;
    }
}

type CardConsultaPetProps = {
  dataHora: string;
  nomePet: string;
  nomeTutor: string;
  nomeVeterinario: string;
  tipoConsulta: 'primeira consulta' | 'retorno' | 'check-up' | 'vacinação';
  especie: string;
  id: string;
};

const CoresPorTipoConsulta: Record<CardConsultaPetProps['tipoConsulta'], string> = {
    'primeira consulta': 'bg-[#BFB5FF]',
    'retorno': 'bg-[#FF641999]',
    'check-up': 'bg-[#9CFF95]',
    'vacinação': 'bg-[#AAE1FF]',
}

export default function CardConsultaPet({ dataHora, nomePet, nomeTutor, nomeVeterinario, tipoConsulta, especie, id}: CardConsultaPetProps) {

    const [data, hora] = dataHora.split(" ");
    const [dia, mes] = data.split("/");
    const anoAtual = new Date().getFullYear();

    const dataConsulta = new Date(`${anoAtual}-${mes}-${dia}T${hora}`);
    const dataAtual = new Date();
    const isConsultaPassada = dataConsulta < dataAtual;


    const corConsulta = isConsultaPassada ? 'bg-[#F0F0F0]' : CoresPorTipoConsulta[tipoConsulta];
    return (
    <Link href={`AppointmentDetails/${id}`} className="w-full max-w-[494px]">
    <Card className={cn("h-[135px] rounded-2xl px-6 py-4 w-full max-w-[494px] flex items-center", corConsulta)}>
        <div className="flex flex-1 items-center justify-between">
            <div className=" flex flex-col items-center bg-[#FFFFFFCC] px-1 py-3 rounded text-sm font-bould text-black">
                <Clock className="w-5 h-5 mb-1" />
                <span>
                    <strong>{dataHora.split(" ")[0]}</strong>
                </span>
                <span>
                    <strong>{dataHora.split(" ")[1]}</strong>
                </span>
            </div>

            <div className="flex flex-row px-4">
                <p className="text-sm">
                    <strong>{nomePet}</strong> / {nomeTutor}
                </p>
            </div>

            <div>
                <p className="text-sm px-2">{nomeVeterinario}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <Image src ={getImagemPet(especie)} width={60} height={60} alt="Pet"/>
                <span className="text-xs bg-[#FFFFFFCC] px-2 py-2 rounded capitalize w-28 text-center">
                    {tipoConsulta}
                </span>
            </div>
        </div>
    </Card>
    </Link>
    );
}