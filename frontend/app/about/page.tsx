"use client";
import React from "react";
import Footer from "@/components/features/footer";
import ResizableDemo from "@/components/features/resizable";
import CarouselDemo from "@/components/features/mid-pr";
import {ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import { CartProvider } from "@/components/features/cart-context"

export default function MenuPage() {
  return (
    <main>
      <CartProvider>
      <Navbar />
      <center><CarouselDemo/></center>
      <center><ResizableDemo/></center>
      <Footer/>
      </CartProvider>
    </main>
  );
}
