"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Bot, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BotaoAcao } from "@/components/Buttons";
import Header from "@/components/Header";
import CardConsultaPet from "@/components/CardConsultaPet";
import { CirclePlus } from "lucide-react";

export default function TelaAtendimento() {
  return (
    <div className="h-screen w-screen border border-blue-700">
      <Header />
      <div className="flex flex-col pt-[48px] border border-purple-800 mx-[10%]">
        <div className="flex flex-col ">
          <h1 className="text-5xl text-black font-source-code font-bold flex">
            Atendimento
          </h1>
          <div className="flex flex-col pt-[32px]">
            <p className="font-normal text-2xl">Qual é o médico?</p>
            <div className="flex flex-row pt-[24px] space-x-6">
              <Input
                type="text"
                className="border border-black rounded-lg w-[520px] h-[50px] font-normal text-[#D9D9D9]"
                placeholder="Pesquise aqui..."
              />
              <div className="pt-[4px] ">
                <Button className="bg-[#7D1AD7] text-white text-base w-[116px] h-[42px] font-bold border rounded-3xl pt-[12px] pr-[32px] pb-[12px] pl-[32px]">
                  Limpar
                </Button>
              </div>
            </div>
          </div>
          <Tabs defaultValue="agendamento" className="mt-[40px] border border-red-800">
            <TabsList className="w-[243px] h-[58px] p-2">
              <div>
                <TabsTrigger
                  value="agendamento"
                  className="text-base font-normal rounded-lg pl-[16px] pr-[16px] pt-[12px] pb-[12px]"
                >
                  Agendamento
                </TabsTrigger>
              </div>
              <div>
                <TabsTrigger
                  value="historico"
                  className="text-base font-normal rounded-lg pl-[16px] pr-[16px] pt-[12px] pb-[12px]"
                >
                  Histórico
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent
              value="agendamento"
              className="justify-center items-center flex flex-col border border-yellow-500"
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-6 border w-full border-green-500 ">
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="primeira consulta"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="retorno"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="check-up"
                  imagemPet="././assets/cardpet/cat 4.svg"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="vacinação"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="vacinação"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="primeira consulta"
                  imagemPet="/assets/gato.png"
                />
              </div>
            </TabsContent>
            <TabsContent
              value="historico"
              className="justify-center items-center flex flex-col"
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-6 ">
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="primeira consulta"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="retorno"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="check-up"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="vacinação"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="vacinação"
                  imagemPet="/assets/gato.png"
                />
                <CardConsultaPet
                  dataHora="18/02 13:00"
                  nomePet="Luna"
                  nomeTutor="João Alves"
                  nomeVeterinario="Dr. José Carlos"
                  tipoConsulta="primeira consulta"
                  imagemPet="/assets/gato.png"
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex mb-[76px] ml-auto border border-black pt-[65px] w-[256px]">
            <BotaoAcao
              texto="Nova Consulta"
              cor="bg-[#50E678]"
              icone={<CirclePlus className="text-white" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
