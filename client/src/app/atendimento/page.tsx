"use client";
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Bot, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BotaoAcao } from "@/components/Buttons";
import Header from "@/components/Header";
import CardConsultaPet from "@/components/CardConsultaPet";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
}

export default function TelaAtendimento() {
  const [medicoSelecionado, setMedicoSelecionado] = useState(""); 
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col pt-[48px] mx-[10%]">
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
                      className="border border-black rounded-lg w-[520px] h-[50px] font-normal text-[#D9D9D9]"
                      placeholder="Pesquise aqui..."
                      value={medicoSelecionado}
                      readOnly
                    />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setMedicoSelecionado("Médico 1")}>
                          Médico 1
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setMedicoSelecionado("Médico 2")}>
                          Médico 2
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setMedicoSelecionado("Médico 3")}>
                          Médico 3
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setMedicoSelecionado("Médico 4")}>
                          Médico 4
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setMedicoSelecionado("Médico 5")}>
                          Médico 5
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
              <div className="pt-[4px] ">
                <Button className="bg-[#7D1AD7] text-white text-base w-[116px] h-[42px] font-bold border rounded-3xl pt-[12px] pr-[32px] pb-[12px] pl-[32px]"
                  onClick={() => setMedicoSelecionado("")}>
                  Limpar
                </Button>
                <div className={cn("grid gap-2", className)}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
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
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
              </div>
            </div>
          </div>
          <Tabs defaultValue="agendamento" className="mt-[40px]">
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
              className="justify-center items-center flex flex-col mt-0"
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-6  w-full pt-8 h-[326px] overflow-scroll">
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
              className="justify-center items-center flex flex-col mt-0"
            >
              <div className=" grid grid-cols-3 grid-rows-2 gap-6  w-full pt-8 h-[326px] overflow-scroll ">
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
  );
}
