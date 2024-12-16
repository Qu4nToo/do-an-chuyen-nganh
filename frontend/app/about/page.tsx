"use client";
import React from "react";
import Footer from "@/components/features/footer";
import ResizableDemo from "@/components/features/resizable";
import CarouselDemo from "@/components/features/mid-pr";
import { ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import { CartProvider } from "@/components/features/cart-context"
import { TitleProvider } from "@/components/features/TitleContext";
import ChatBot from "@/components/chatbotbubble";
export default function MenuPage() {
  return (
    <main>
      <title>About</title>
      <CartProvider>
        <TitleProvider>
          <Navbar />
          <center><ResizableDemo /></center>
          <ChatBot />
          <Footer />
        </TitleProvider>
      </CartProvider>
    </main>
  );
}
