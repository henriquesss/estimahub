import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { Footer } from "@components/Footer";
import StyledJsxRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "estimahub",
  description: "The best place to estimate software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <StyledJsxRegistry>
          <body className={inter.className}>{children}</body>
        </StyledJsxRegistry>
        <Footer />
      </AuthProvider>
    </html>
  );
}
