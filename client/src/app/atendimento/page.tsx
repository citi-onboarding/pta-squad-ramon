"use client";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BotaoAcao } from "@/components/Buttons";
import Header from "@/components/Header";
import CardConsultaPet from "@/components/CardConsultaPet";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { Cat } from "@/assets";

export default function TelaAtendimento() {
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), 0),
    to: undefined,
  });

  const [cards] = useState([
    {
      dataHora: "18/02 13:00", //serve para comparação visual
      nomePet: "Luna",
      nomeTutor: "João Alves",
      nomeVeterinario: "Dr. Carlos Eduardo Silva",
      tipoConsulta: "primeira consulta",
      imagemPet: Cat,
      data: new Date(2024, 2, 18, 13, 0), //serve para filtros
    },
    {
      dataHora: "18/02 13:00",
      nomePet: "Luna",
      nomeTutor: "João Alves",
      nomeVeterinario: "Dra. Fernanda Costa",
      tipoConsulta: "retorno",
      imagemPet: Cat,
      data: new Date(2024, 1, 18, 13, 0),
    },
    {
      dataHora: "18/02 13:00",
      nomePet: "Luna",
      nomeTutor: "João Alves",
      nomeVeterinario: "Dr. Carlos Eduardo Silva",
      tipoConsulta: "check-up",
      imagemPet: Cat,
      data: new Date(2024, 1, 18, 13, 0),
    },
    {
      dataHora: "18/02 13:00",
      nomePet: "Luna",
      nomeTutor: "João Alves",
      nomeVeterinario: "Dr. José Carlos",
      tipoConsulta: "vacinação",
      imagemPet: Cat,
      data: new Date(2024, 1, 18, 13, 0),
    },
    {
      dataHora: "18/02 13:00",
      nomePet: "Luna",
      nomeTutor: "João Alves",
      nomeVeterinario: "Dr. José Carlos",
      tipoConsulta: "vacinação",
      imagemPet: Cat,
      data: new Date(2024, 1, 18, 13, 0),
    },
    {
      dataHora: "18/02 13:00",
      nomePet: "Luna",
      nomeTutor: "João Alves",
      nomeVeterinario: "Dr. José Carlos",
      tipoConsulta: "primeira consulta",
      imagemPet: Cat,
      data: new Date(2024, 1, 18, 13, 0),
    },
  ]);

  const cardsFiltrados = cards.filter((card) => {
    const filtroMedico = medicoSelecionado
      ? card.nomeVeterinario === medicoSelecionado
      : true;

    const filtroData =
      date.from && date.to
        ? card.data >= date.from && card.data <= date.to
        : true;

    return filtroMedico && filtroData;
  });

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col mt-12 mx-[10%]">
        <div className="flex flex-col ">
          <h1 className="text-5xl text-black font-source-code font-bold flex">
            Atendimento
          </h1>
          <div className="flex flex-col pt-[32px]">
            <p className="font-normal text-2xl">Qual é o médico?</p>
            <div className="flex flex-row pt-[24px] space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Input
                    type="text"
                    className="border border-black rounded-lg w-[520px] h-[50px] font-normal cursor-pointer text-black"
                    placeholder="Pesquise aqui..."
                    value={medicoSelecionado}
                    readOnly
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() =>
                        setMedicoSelecionado("Dr. Carlos Eduardo Silva")
                      }
                    >
                      Dr. Carlos Eduardo Silva
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setMedicoSelecionado("Dra. Ana Beatriz Oliveira")
                      }
                    >
                      Dra. Ana Beatriz Oliveira
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setMedicoSelecionado("Dr. Roberto Lima")}
                    >
                      Dr. Roberto Lima
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setMedicoSelecionado("Dra. Fernanda Costa")
                      }
                    >
                      Dra. Fernanda Costa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setMedicoSelecionado("Dr. Miguel Santos Pereira")
                      }
                    >
                      Dr. Miguel Santos Pereira
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="pt-[4px] flex flex-row w-full">
                <Button
                  className="bg-[#7D1AD7] text-white text-base w-[116px] h-[42px] font-bold border rounded-3xl pt-[12px] pr-[32px] pb-[12px] pl-[32px]"
                  onClick={() => setMedicoSelecionado("")}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Tabs defaultValue="agendamento" className="mt-[40px]">
              <div className="flex ">
                <TabsList className="h-[58px] p-2 flex flex-row justify-start">
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
                <div className="flex justify-end items-end h-[58px] ml-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px]  justify-start text-left font-normal h-[58px]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range" //de - até
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => {
                          if (range) setDate(range);
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <TabsContent
                value="agendamento"
                className="justify-center items-center flex flex-col mt-0"
              >
                <div className="grid grid-cols-3 gap-6 w-full mt-8 max-h-[326px] overflow-y-scroll scrollbar-none">
                  {cardsFiltrados.map((card, idx) => ( //renderização dos cards por filtro
                    <CardConsultaPet
                      key={idx}
                      {...card}
                      tipoConsulta={card.tipoConsulta as "primeira consulta" | "retorno" | "check-up" | "vacinação"}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="historico"
                className="justify-center items-center flex flex-col mt-0"
              >
                <div className="grid grid-cols-3 gap-6 w-full pt-8 max-h-[326px] overflow-y-scroll scrollbar-none">
                  {cardsFiltrados.map((card, idx) => (
                    <CardConsultaPet
                      key={idx}
                      {...card}
                      tipoConsulta={card.tipoConsulta as "primeira consulta" | "retorno" | "check-up" | "vacinação"}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex mb-[76px] ml-auto pt-[65px] w-[256px]">
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
    </div>
  );
}