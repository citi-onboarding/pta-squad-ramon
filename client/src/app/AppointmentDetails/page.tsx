'use client'
import Header from '@/components/Header';
import { CardHistory } from '@/components/CardHistory';

export default function AppointmentsDetails() {
  return (
<div className="h-screen">
  <Header />

  <div className="flex flex-row mt-12 mx-[10%] gap-8">
    
    
    <div className="w-1/2 flex flex-col">
      <h1 className="text-5xl text-black font-source-code font-bold mb-4">
        Atendimento
      </h1>
      <p className="text-gray-700">
        Aqui você pode colocar informações, instruções ou descrição do atendimento.
      </p>
    </div>

    
    <div className="w-1/2 flex flex-col ">
    <div className="border border-gray-400 p-6 rounded-md shadow-sm">
  <CardHistory />
  
    </div>
      
    </div>
  </div>
</div>)}