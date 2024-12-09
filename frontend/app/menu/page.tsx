"use client";
import React from "react";
import Footer from "@/components/features/footer";
import {ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import ChatBot from "@/components/chatbotbubble";
import { CartProvider } from "@/components/features/cart-context";

export default function MenuPage() {
  return (
    <main>
      <CartProvider>
      <Navbar />
      <ListProduct/>
      <Footer/>
      <ChatBot/>
      </CartProvider>
    </main>
  );
}
