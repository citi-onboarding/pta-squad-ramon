import React from 'react';
import { ChevronRight } from 'lucide-react'; 

export function CardHistory() {
  return (
    <div className='flex h-[82px] w-[510px] p-6 bg-[#F0F0F0] rounded-2xl justify-between'>

      <div className='bg-white text-sm p-2 flex flex-col justify-center items-center'>
        <p>18/02</p>
        <p>13:40</p>
      </div>

      <div>
        <p>Primeira consulta</p>
      </div>

      <div>
        <p>Doutor Rafael</p>
      </div>

      <div>
        <ChevronRight />
      </div>

    </div>
  );
}