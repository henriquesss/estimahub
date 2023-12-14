"use client"

import { Estimatives } from "@/components/Estimatives";
import { Header } from '@/components/Header';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header/>
      <main className="flex flex-col justify-center items-center p-24">
        <div className="container mx-auto text-center">
          <section className="mb-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-2 italic">O que você precisa estimar hoje?</h1>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Autenticação com next.js, automação com python..."
                  className="bg-gray-300 text-black p-2 rounded w-full md:w-1/2"
                />
                <button className="ml-2 w-full md:w-auto">Pesquisar</button>
              </div>
            </div>
          </section>

          <section>
            {/* <Estimatives limit={9}/> */}
            <Button onClick={() => { router.push('/all')}}>Veja mais</Button>
          </section>
        </div>
      </main>
    </>
  )
}
