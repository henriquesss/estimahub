"use client";

import { Estimates } from "../components/Estimates";
import { Header } from "../components/Header";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center p-24">
        <div className="container mx-auto text-center">
          <section className="mb-16">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">
                estimahub <span className="text-sm text-gray-600">1.0.4</span>
              </h1>
              <p className="w-96 text-center">
                A community focused on sharing and studying experiences with
                software estimates publicly
              </p>
            </div>
          </section>

          <section>
            <Estimates limitParam={9} />
          </section>
        </div>
      </main>
    </>
  );
}
