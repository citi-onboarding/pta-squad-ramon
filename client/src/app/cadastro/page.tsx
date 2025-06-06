"use client";
import Header from "@/components/Header";
import Button from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Ovelha, Cachorro, Gato, Girafa, Porco, Cavalo } from "@/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModalCadastro from "@/components/ModalCadastro";
import { useState } from "react";
import api from "@/services/api";

const formSchema = z.object({
  nomemPaciente: z
    .string()
    .min(1, { message: "Nome do paciente é obrigatório" }),
  nomeTutor: z.string().min(1, { message: "Nome do tutor é obrigatório" }),
  especie: z.string().min(1, { message: "Selecione uma espécie" }),
  idadePaciente: z
    .string()
    .min(1, { message: "Idade do paciente é obrigatória" })
    .regex(/^\d+$/, { message: "Idade deve ser um número" }),
});

type FormData = z.infer<typeof formSchema>;

export default function TelaCadastro() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingPatient, setIsSubmittingPatient] = useState(false);
  const [createdPatientData, setCreatedPatientData] = useState<{ id: string; name?: string; [key: string]: any } | null>(null);

  const animais = [
    { name: "Ovelha", src: Ovelha, alt: "Ovelha" },
    { name: "Cachorro", src: Cachorro, alt: "Cachorro" },
    { name: "Gato", src: Gato, alt: "Gato" },
    { name: "Girafa", src: Girafa, alt: "Girafa" },
    { name: "Porco", src: Porco, alt: "Porco" },
    { name: "Cavalo", src: Cavalo, alt: "Cavalo" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomemPaciente: "",
      nomeTutor: "",
      especie: "",
      idadePaciente: "",
    },
  });

  const especie = watch("especie");

  const onSubmitPatient = async (data: FormData) => {
    setIsSubmittingPatient(true);
    setCreatedPatientData(null);

    const patientPayload = {
      name: data.nomemPaciente,
      tutorName: data.nomeTutor,
      species: data.especie,
      age: data.idadePaciente,
    };

    try {
      const response = await api.post("/api/patients", patientPayload);
      
      if (!response.data || !response.data.id) {
        console.error("Resposta da API inválida. ID do paciente não encontrado.", response.data);
        throw new Error("ID do paciente não retornado pela API.");
      }

      setCreatedPatientData(response.data);
      setIsModalOpen(true);
      
    } catch (error: any) {
      console.error("Erro ao criar paciente:", error);
      let errorMessage = "Falha ao cadastrar o paciente.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.error;
      }
      alert(`Erro: ${errorMessage}`);
    } finally {
      setIsSubmittingPatient(false);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h1
          className="text-4xl font-bold leading-[110px] w-80 h-14 p-2 ml-[180px] mb-14"
          style={{ fontFamily: '"Source Code Pro", monospace' }}
        >
          Cadastro
        </h1>
      </div>

      <div className="px-4 md:px-12 lg:px-48 overflow-y-auto">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4"
          onSubmit={handleSubmit(onSubmitPatient)}
        >
          <div className="flex flex-col mb-3">
            <Label htmlFor="nomePaciente" className="font-medium mb-2">
              Nome do Paciente
            </Label>
            <Input
              id="nomePaciente"
              {...register("nomemPaciente")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.nomemPaciente && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nomemPaciente.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="nomeTutor" className="font-medium mb-2">
              Nome do Tutor
            </Label>
            <Input
              id="nomeTutor"
              {...register("nomeTutor")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.nomeTutor && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nomeTutor.message}
              </p>
            )}
          </div>

          <div className="col-span-2 mb-3">
            <Label className="font-medium mb-4">
              Qual é a espécie do paciente?
            </Label>
            <div className="flex flex-wrap gap-4 p-3">
              {animais.map((animal) => (
                <div
                  key={animal.name}
                  className={`p-2 rounded-md cursor-pointer w-[120px] h-[120px] flex items-center justify-center
                  ${especie === animal.name ? "bg-[#D9D9D9]" : ""}`}
                  onClick={() =>
                    setValue("especie", animal.name, { shouldValidate: true })
                  }
                >
                  <Image
                    src={animal.src}
                    alt={animal.alt}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
            {errors.especie && (
              <p className="text-red-500 text-sm mt-1">
                {errors.especie.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="idadePaciente" className="font-medium mb-2">
              Idade do paciente
            </Label>
            <Input
              id="idadePaciente"
              {...register("idadePaciente")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.idadePaciente && (
              <p className="text-red-500 text-sm mt-1">
                {errors.idadePaciente.message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="fixed bottom-4 right-4 md:bottom-16 md:right-24">
        <Button
          texto="Finalizar Cadastro"
          cor="bg-[#50E678]"
          onClick={handleSubmit(onSubmitPatient)}
        />
      </div>

      {isModalOpen && createdPatientData && (
        <ModalCadastro
          onClose={() => { 
            setIsModalOpen(false);
            reset();
          }}
          patientId={createdPatientData.id}
          patientDisplayName={createdPatientData.name || createdPatientData.nomemPaciente}
        />
      )}

    </>
  );
}
