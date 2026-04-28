import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ShopFlow E-commerce",
  description: "E-commerce full stack com carrinho e pagamento integrado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}