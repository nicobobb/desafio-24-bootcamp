import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desafio 24 - Nicolas Bobb",
  description: "Educacion IT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-800">{children}</body>
    </html>
  );
}
