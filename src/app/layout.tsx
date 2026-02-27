import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "Furniture Swiper",
  description:
    "Swipe right on furniture you love. Tinder-style shopping for your new apartment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf8f5] antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
