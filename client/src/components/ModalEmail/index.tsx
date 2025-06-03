"use client";
import { useState } from "react";
import Button from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button as ButtonComponent } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoCITipet } from "@/assets";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  emailUser: z.string().min(1, { message: "Email é obrigatório" }),
});

type FormData = z.infer<typeof formSchema>;

interface ModalProps {
  onClose: () => void;
}

export default function ModalConsulta({ onClose }: ModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailUser: "",
    },
  });

  const [date, setDate] = useState<Date | undefined>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    try {
      onClose();
    } catch (error) {
      console.error("Erro", error);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-10">
      <Card
        className={cn(
          "rounded-2xl px-12 py-12 w-full max-w-[824px] shadow-xl relative bg-white"
        )}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <Image src={LogoCITipet} alt="Logo" width={189} height={74} />
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <Input
              id="E-mail"
              {...register("emailUser")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.emailUser && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailUser.message}
              </p>
            )}
          </div>

          <div className="mt-5 col-span-2  flex justify-center">
            <Button
              texto="Enviar"
              cor="bg-[#50E678]"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}