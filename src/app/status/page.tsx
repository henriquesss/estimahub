import React from "react";
import { Header } from "@components/Header";

export default function StatusPage() {
  return (
    <>
      <Header />
      <article>
        <div className="container mx-auto py-5">
          <h1 className="text-2xl">Platform status</h1>
          <p>Soon:</p>
          <p>Total qtt of users</p>
          <p>Total qtt of estimatives</p>
          <p>Total qtt of assertive estimatives</p>
          <p>Db data of firebase</p>
          <p>Web server data of Vercel</p>
          <p>List of contributors</p>
        </div>
      </article>
    </>
  );
}
