"use client";
import Image from "next/image";
import TelaAtendimento from "./atendimento/page";
import ModalEmail from "@/components/ModalEmail/index";
import { LogoCITi } from "../assets";

export default function Home() {
  return (
    <>
      <TelaAtendimento />
      <ModalEmail onClose={() => {}} />
    </>
  );
}