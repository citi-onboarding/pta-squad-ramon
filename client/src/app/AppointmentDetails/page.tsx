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
          
        </div>

        <div className="w-1/2 flex flex-col content-start">
          <div className="flex flex-col justify-center transform scale-75">
            <h1 className="text-lg font-bold mb-5 text-[24px]">
              Histórico de consultas
            </h1>
            <div className="border border-gray-400 p-4 rounded-md  space-y-4  ">
              <CardHistory />
              <CardHistory />
              <CardHistory />
              <CardHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}