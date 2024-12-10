"use client";
import React from "react";
import Footer from "@/components/features/footer";
import Navbar from "@/components/features/navigation";
import CheckoutPage from "@/components/features/cart-checkout";
import { CartProvider } from "@/components/features/cart-context"
import { Title } from "@radix-ui/react-toast";
import { TitleProvider } from "@/components/features/TitleContext";

export default function MenuPage() {
  return (
    <main>
      <CartProvider>
        <TitleProvider>
          <Navbar />
          <center><CheckoutPage /></center>
          <Footer />
        </TitleProvider>
      </CartProvider>
    </main>
  );
}
