"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollView, View, Text } from "react-native";
// import { Gato, Cachorro, vaca, Ovelha, Porco, Cavalo } from "./assets";

// function getImagemPet(especie: string) {
//   switch (especie) {
//     case "gato":
//       return Gato;
//     case "cachorro":
//       return Cachorro;
//     case "vaca":
//       return vaca;
//     case "cavalo":
//       return Cavalo;
//     case "porco":
//       return Porco;
//     case "ovelha":
//       return Ovelha;
//     default:
//       return null;
//   }
// }

type CardConsultaPetProps = {
  dataHora: string;
  nomePet: string;
  nomeTutor: string;
  nomeVeterinario: string;
  tipoConsulta: "primeira consulta" | "retorno" | "check-up" | "vacinação";
  especie: string;
  id: string;
};

const CoresPorTipoConsulta: Record<CardConsultaPetProps["tipoConsulta"], string> = {
  "primeira consulta": "bg-[#BFB5FF]",
  retorno: "bg-[#FF641999]",
  "check-up": "bg-[#9CFF95]",
  vacinação: "bg-[#AAE1FF]",
};

export default function CardConsultaPet({
  dataHora,
  nomePet,
  nomeTutor,
  nomeVeterinario,
  tipoConsulta,
  especie,
  id,
}: CardConsultaPetProps) {
  const [data, hora] = dataHora.split(" ");
  const [dia, mes] = data.split("/");
  const anoAtual = new Date().getFullYear();

  const dataConsulta = new Date(`${anoAtual}-${mes}-${dia}T${hora}`);
  const dataAtual = new Date();
  const isConsultaPassada = dataConsulta < dataAtual;

  const corConsulta = isConsultaPassada
    ? "bg-[#F0F0F0]"
    : CoresPorTipoConsulta[tipoConsulta];

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <Link href={`AppointmentDetails/${id}`} className="w-full max-w-[494px] mx-auto">
        <div
          className={`h-[135px] rounded-2xl px-6 py-4 w-full flex items-center ${corConsulta}`}
        >
          <View className="flex flex-1 items-center justify-between">
            <View className="flex flex-col items-center bg-[#FFFFFFCC] px-1 py-3 rounded text-sm font-bold text-black">
              <Clock className="w-5 h-5 mb-1" />
              <Text>
                <strong>{dataHora.split(" ")[0]}</strong>
              </Text>
              <Text>
                <strong>{dataHora.split(" ")[1]}</strong>
              </Text>
            </View>

            <View className="flex flex-row px-4">
              <Text className="text-sm">
                <strong>{nomePet}</strong> / {nomeTutor}
              </Text>
            </View>

            <View>
              <Text className="text-sm px-2">{nomeVeterinario}</Text>
            </View>

            <View className="flex flex-col items-center gap-2">
              {/* {getImagemPet(especie) && (
                <Image
                  src={getImagemPet(especie)}
                  width={60}
                  height={60}
                  alt="Pet"
                /> */}
              {/* )} */}
              <Text className="text-xs bg-[#FFFFFFCC] px-2 py-2 rounded capitalize w-28 text-center">
                {tipoConsulta}
              </Text>
            </View>
          </View>
        </div>
      </Link>
    </ScrollView>
  );
}