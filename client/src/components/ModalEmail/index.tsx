"use client";
import Button from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { LogoCITipet } from "@/assets";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  emailUser: z.string().min(1, { message: "Email é obrigatório" }),
});

type FormData = z.infer<typeof formSchema>;

interface ModalProps {
  onClose: () => void;
}

export default function ModalEmail({ onClose }: ModalProps) {
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
          "rounded-2xl px-12 py-12 w-full max-w-[408px] h-[423px] shadow-xl relative bg-white border"
        )}
      >
        <div className="flex flex-col ">
          <div className="flex justify-center mb-8">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-2xl mt-7 mr-7 font-bold"
              >
                &times;
              </button>
            </div>
            <Image src={LogoCITipet} alt="Logo" width={189} height={74} />
          </div>
          <p className="text-center text-lg font-normal mb-2">
            <span>
              <strong>Cadastro finalizado!</strong> Envie o
            </span>
            <br />
            <span>
              comprovante para o <strong>tutor</strong>
            </span>
          </p>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 border-border-green-700"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col mt-2">
              <p className="mb-1">
                <strong>E-mail</strong>
              </p>
              <Input
                id="E-mail"
                {...register("emailUser")}
                type="text"
                placeholder="Digite aqui..."
                className="border-gray-800 p-4 w-[305px] h-[50px] border rounded-lg placeholder:text-[#D9D9D9]"
              />

              {errors.emailUser && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailUser.message}
                </p>
              )}
            </div>

            <div className="col-span-2 flex justify-center mt-2">
              <Button
                texto="Enviar"
                cor="bg-[#50E678]"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
