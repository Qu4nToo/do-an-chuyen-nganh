"use client";
import React from "react";
import Footer from "@/components/features/footer";
import { ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import ChatBot from "@/components/chatbotbubble";
import { CartProvider } from "@/components/features/cart-context";
import { TitleProvider } from "@/components/features/TitleContext";

export default function MenuPage() {
  return (
    <main>
      <CartProvider>
        <TitleProvider>
          <Navbar/>
          <ListProduct/>
          <Footer />
          <ChatBot />
        </TitleProvider>
      </CartProvider>
    </main>
  );
}
