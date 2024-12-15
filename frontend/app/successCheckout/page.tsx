"use client";
import Navbar from "@/components/features/navigation";
import React from "react";
import Footer from "@/components/features/footer";
import ResizableDemo from "@/components/features/resizable";
import CarouselDemo from "@/components/features/mid-pr";
import {ListProduct } from "@/components/features/list-product";
import { CartProvider } from "@/components/features/cart-context"
import { TitleProvider } from "@/components/features/TitleContext";
import CheckoutSuccess from "@/components/features/checkOutSucess"
export default function MenuPage() {
  return (
    <main>
      <CartProvider>
      <TitleProvider>
      <Navbar />
    
      <center><CheckoutSuccess/></center>

      <Footer/>
      </TitleProvider>
      </CartProvider>
    </main>
  );
}
