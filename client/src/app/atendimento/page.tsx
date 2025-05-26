"use client";
 
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import {BotaoAcao}  from "@/components/Buttons"
import Header from "@/components/Header"
import CardConsultaPet from "@/components/CardConsultaPet"

export default function TelaAtendimento() {
  return (
    <div className="h-screen">
      <Header/>
      <div className="flex flex-col pl-[194px] pt-[48px]">
        <h1 className="text-5xl text-black font-source-code font-bold"> 
          Atendimento
        </h1>
        <div className="flex flex-col pt-[32px] pl-[194px]">
            <p className="font-normal text-2xl">Qual é o médico?</p>
            <div className="flex flex-row pt-[24px] px-[24px]">
                <Input type="text" className="border border-black rounded-lg w-[520px] h-[50px] font-normal text-[#D9D9D9] " placeholder="Pesquise aqui..." />
                <Button className="bg-[#7D1AD7] text-white text-base font-bold border rounded-3xl pt-[12px] pr-[32px] pb-[12px] pl-[32px]">Buscar</Button>
            </div>
        </div>
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}