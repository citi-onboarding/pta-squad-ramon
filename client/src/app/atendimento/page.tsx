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
import { useState, useEffect, useMemo } from "react";
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
import BotaoAcao from "@/components/Buttons";
import Header from "@/components/Header";
import CardConsultaPet from "@/components/CardConsultaPet";
import { CirclePlus } from "lucide-react";
import { getAppointments } from "@/services/appointments/getAppointments";

export default function TelaAtendimento() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const agora = new Date();

  const agendamentosFuturos = useMemo(() => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      if (appointmentDate < agora) return false;

      const filtroMedico = medicoSelecionado
        ? appointment.doctor === medicoSelecionado
        : true;

      const filtroData =
        date?.from && date?.to
          ? appointmentDate >= date.from && appointmentDate <= date.to
          : true;

      return filtroMedico && filtroData;
    });
  }, [appointments, medicoSelecionado, date]);

  const historicoConsultas = useMemo(() => {
    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        if (appointmentDate >= agora) return false;

        const filtroMedico = medicoSelecionado
          ? appointment.doctor === medicoSelecionado
          : true;

        const filtroData =
          date?.from && date?.to
            ? appointmentDate >= date.from && appointmentDate <= date.to
            : true;

        return filtroMedico && filtroData;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [appointments, medicoSelecionado, date]);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col mt-12 mx-[10%]">
        <div className="flex flex-col ">
          <h1
            className="text-4xl text-black font-source-code font-bold flex"
            style={{ fontFamily: '"Source Code Pro", monospace' }}
          >
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
                          "w-[300px]  justify-start text-left font-normal h-[58px]",
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
              <TabsContent
                value="agendamento"
                className="justify-center items-center flex flex-col mt-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8 max-h-[326px] overflow-y-scroll scrollbar-none">
                  {agendamentosFuturos.map((appointment) => (
                    <CardConsultaPet
                      key={appointment.id}
                      {...appointment}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="historico"
                className="justify-center items-center flex flex-col mt-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 max-h-[326px] overflow-y-scroll scrollbar-none">
                  {historicoConsultas.map((appointment) => (
                    <CardConsultaPet
                      key={appointment.id}
                      {...appointment}
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