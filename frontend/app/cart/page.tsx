"use client";
import React from "react";
import Footer from "@/components/features/footer";
import Navbar from "@/components/features/navigation";
import CheckoutPage from "@/components/features/cart-checkout";
import { CartProvider } from "@/components/features/cart-context"

export default function MenuPage() {
  return (
    <main>
       <CartProvider>
      <Navbar />
      <center><CheckoutPage/></center>
      <Footer/>
      </CartProvider>
    </main>
  );
}
