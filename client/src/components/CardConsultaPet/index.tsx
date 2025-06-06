"use client";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
// Corrigido para manter a consistência de capitalização (PascalCase)
import { Gato, Cachorro, vaca, Ovelha, Porco, Cavalo } from "@/assets";

// Função atualizada para usar inglês e ter um retorno padrão
function getImagemPet(species: string) {
  // Usar toLowerCase para garantir a correspondência, mesmo que a prop venha com maiúsculas
  switch (species) {
    case "gato": 
      return Gato;
    case "cachorro":
      return Cachorro;
    case "vaca":
      return vaca;
    case "cavalo":
      return Cavalo;
    case "porco":
      return Porco;
    case "ovelha":
      return Ovelha;
    default:
      return Gato;
  }
}

type CardConsultaPetProps = {
  date: string;
  name: string;
  tutorName: string;
  doctor: string;
  appointmentType: "primeira consulta" | "retorno" | "checkup" | "vacinacao";
  species: string; // O nome da prop está em inglês
  id: string;
};

const CoresPorTipoConsulta: Record<
  CardConsultaPetProps["appointmentType"],
  string
> = {
  "primeira consulta": "bg-[#BFB5FF]",
  "retorno": "bg-[#FF641999]",
  checkup: "bg-[#9CFF95]",
  vacinacao: "bg-[#AAE1FF]",
};

export default function CardConsultaPet({
  date,
  name,
  tutorName,
  doctor,
  appointmentType,
  species,
  id,
}: CardConsultaPetProps) {
  const dataConsulta = new Date(date || new Date());

  const dia = String(dataConsulta.getDate()).padStart(2, "0");
  const mes = String(dataConsulta.getMonth() + 1).padStart(2, "0");
  const horas = String(dataConsulta.getHours()).padStart(2, "0");
  const minutos = String(dataConsulta.getMinutes()).padStart(2, "0");

  const dataParaExibir = `${dia}/${mes}`;
  const horaParaExibir = `${horas}:${minutos}`;

  const dataAtual = new Date();
  const isConsultaPassada = dataConsulta < dataAtual;

  const corConsulta = isConsultaPassada
    ? "bg-[#F0F0F0]"
    : CoresPorTipoConsulta[appointmentType];

  return (
    <Link href={`/AppointmentDetails/${id}`} className="w-full max-w-[494px]">
      <Card
        className={cn(
          "h-[135px] rounded-2xl px-6 py-4 w-full flex items-center",
          corConsulta
        )}
      >
        <div className="flex flex-1 items-center justify-between w-full">
          {/* Bloco de Data e Hora */}
          <div className="flex flex-col items-center bg-[#FFFFFFCC] px-1 py-3 rounded text-sm font-bold text-black">
            {" "}
            <Clock className="w-5 h-5 mb-1" />
            {/* Usando as variáveis 'data' e 'hora' que já foram criadas */}
            <span>{dataParaExibir}</span>
            <span>{horaParaExibir}</span>
          </div>

          {/* Bloco de Informações do Pet, Tutor e Veterinário */}
          <div className="flex-1 px-4">
            <p className="text-sm">
              <strong>{name}</strong> / {tutorName}
            </p>
            <p className="text-sm mt-1">{doctor}</p>
          </div>

          {/* Bloco da Imagem e Tipo de Consulta */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src={getImagemPet(species)}
              width={60}
              height={60}
              alt={`Foto de um ${species}`}
            />
            <span className="text-xs bg-[#FFFFFFCC] px-2 py-1 rounded capitalize w-28 text-center">
              {appointmentType}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
