"use client";
import React from "react";
import Footer from "@/components/features/footer";
import ResizableDemo from "@/components/features/resizable";
import {ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import { CartProvider } from "@/components/features/cart-context"
import ContactPage from "@/components/features/mid-pr";
import { TitleProvider } from "@/components/features/TitleContext";
export default function MenuPage() {
  return (
    <main>
      <title>Contact</title>
      <CartProvider>
        <TitleProvider>
      <Navbar />
       <ContactPage/>
      <Footer/>
      </TitleProvider> 
      </CartProvider>
    </main>
  );
}
