"use client";
import Header from "@/components/Header";
import Button from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Ovelha, Cachorro, Gato, vaca, Porco, Cavalo } from "@/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModalCadastro from "@/components/ModalCadastro";
import { useState } from "react";
import api from "@/services/api";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome do paciente é obrigatório" }),
  tutorName: z.string().min(1, { message: "Nome do tutor é obrigatório" }),
  species: z.string().min(1, { message: "Selecione uma espécie" }),
  age: z
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
    { name: "ovelha", src: Ovelha, alt: "Ovelha" },
    { name: "cachorro", src: Cachorro, alt: "Cachorro" },
    { name: "gato", src: Gato, alt: "Gato" },
    { name: "vaca", src: vaca, alt: "vaca" },
    { name: "porco", src: Porco, alt: "Porco" },
    { name: "cavalo", src: Cavalo, alt: "Cavalo" },
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
      name: "",
      tutorName: "",
      species: "",
      age: "",
    },
  });

  const species = watch("species");

  const onSubmitPatient = async (data: FormData) => {
    setIsSubmittingPatient(true);
    setCreatedPatientData(null);

    const patientPayload = {
      name: data.name,
      tutorName: data.tutorName,
      species: data.species,
      age: Number(data.age),
    };

    console.log("Paciente cadastrado com sucesso:", patientPayload);
    try {
      const response = await api.post("/patients", patientPayload);

      setCreatedPatientData(response.data);
      setIsModalOpen(true);
    } catch {
      alert("Falha ao cadastrar o paciente.");
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
              {...register("name")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="tutorName" className="font-medium mb-2">
              Nome do Tutor
            </Label>
            <Input
              id="tutorName"
              {...register("tutorName")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.tutorName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tutorName.message}
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
                  ${species === animal.name ? "bg-[#D9D9D9]" : ""}`}
                  onClick={() =>
                    setValue("species", animal.name, { shouldValidate: true })
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
            {errors.species && (
              <p className="text-red-500 text-sm mt-1">
                {errors.species.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="age" className="font-medium mb-2">
              Idade do paciente
            </Label>
            <Input
              id="age"
              {...register("age")}
              type="text"
              placeholder="Digite aqui..."
              className="border-black p-2"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.age.message}
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
          patientDisplayName={createdPatientData.name || createdPatientData.name}
        />
      )}

    </>
  );
}
