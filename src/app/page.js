"use client"

import { Estimatives } from "@/components/Estimatives";
import { Header } from '@/components/Header';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header/>
      <main className="flex flex-col justify-center items-center p-24">
        <div className="container mx-auto text-center">
          <section className="mb-16">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">estimahub <span className="text-sm text-gray-600">1.0.2</span></h1>
              <p className="w-96 text-center">Uma comunidade focada em compartilhar e estudar experiências com estimativas de software de forma pública</p>
            </div>
          </section>

          <section>
            <Estimatives limit={9}/>
            <Button onClick={() => { router.push('/estimatives')}}>Veja mais</Button>
          </section>
        </div>
      </main>
    </>
  )
}
