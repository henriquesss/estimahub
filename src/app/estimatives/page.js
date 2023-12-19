"use client"

import { Estimatives } from "@/components/Estimatives";
import { Header } from '@/components/Header';

export default function EstimativesPage() {
    return (
        <>
            <Header />
            <main className="flex flex-col justify-center items-center p-24">
                <div className="container mx-auto text-center">
                    <section>
                        <Estimatives/>
                    </section>
                </div>
            </main>
        </>
    )
}
