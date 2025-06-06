"use client";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import CardConsultaPet from "@/components/CardConsultaPet";

const consultasMock = [
  {
    id: "1",
    dataHora: "18/02 08:30",
    nomePet: "Luna",
    nomeTutor: "João Alves",
    nomeVeterinario: "Dr. José Carlos",
    tipoConsulta: "Primeira Consulta",
    especie: "gato",
  },
  {
    id: "2",
    dataHora: "18/02 13:15",
    nomePet: "Rex",
    nomeTutor: "Maria Souza",
    nomeVeterinario: "Dr. Ana Martins",
    tipoConsulta: "Retorno",
    especie: "cachorro",
  },
  {
    id: "3",
    dataHora: "18/02 19:00",
    nomePet: "Mimi",
    nomeTutor: "Carlos Lima",
    nomeVeterinario: "Dr. José Carlos",
    tipoConsulta: "Vacinação",
    especie: "gato",
  },
];

const getHora = (dataHora: string) =>
  parseInt(dataHora.split(" ")[1].split(":")[0]);

const Home = () => {
  const [periodo, setPeriodo] = useState<"manha" | "tarde" | "noite">("manha");

  const filtrarConsultas = () => {
    return consultasMock.filter((consulta) => {
      const hora = getHora(consulta.dataHora);
      if (periodo === "manha") return hora >= 5 && hora < 12;
      if (periodo === "tarde") return hora >= 12 && hora < 18;
      if (periodo === "noite") return hora >= 18 && hora < 24;
    });
  };

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <Text
        className="text-[24px] font-extrabold text-[#000] py-2"
        style={{ fontFamily: "monospace" }}
      >
        Sua agenda
      </Text>
      <Text className="text-[12px] text-[#000] mb-4">
        Veja aqui todos os seus pacientes agendados para hoje.
      </Text>

      <View className="flex-row justify-around items-center h-[70px] border drop-shadow-md bg-gray-200 rounded-2xl px-6 py-3 mb-4">
        <TouchableOpacity onPress={() => setPeriodo("manha")}>
          <Text
            className={`text-xl ${
              periodo === "manha" ? "text-green-600" : "text-gray-600"
            }`}
          >
            ☀️
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPeriodo("tarde")}>
          <Text
            className={`text-xl ${
              periodo === "tarde" ? "text-green-600" : "text-gray-600"
            }`}
          >
            🌤️
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPeriodo("noite")}>
          <Text
            className={`text-xl ${
              periodo === "noite" ? "text-green-600" : "text-gray-600"
            }`}
          >
            🌙
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mb-24">
        {filtrarConsultas().length > 0 ? (
          filtrarConsultas().map((consulta) => (
            <CardConsultaPet key={consulta.id} {...consulta} />
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-8">
            Nenhuma consulta neste horário.
          </Text>
        )}
      </ScrollView>

      <View className="absolute bottom-0 w-full h-[75px] bg-[#50E678] rounded-t-3xl" />
    </View>
  );
};

export default Home;
