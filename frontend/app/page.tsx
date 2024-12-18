"use client";
import React from "react";

import Category from "@/components/features/category";
import Navbar from "@/components/features/navigation";
import BannerCard from "@/components/features/banner";
import BestSeller from "@/components/features/best-seller";
import Footer from "@/components/features/footer";
import ChatBot from "@/components/chatbotbubble";
import { CartProvider } from "@/components/features/cart-context";
import { TitleProvider } from "@/components/features/TitleContext";

export default function Home() {
  return (
    <main>
      <CartProvider>
        <TitleProvider>
          <Navbar />
          <div className="w-5/6 h-full mx-auto">
            <BannerCard />
          </div>
          <Category />
          <BestSeller />
          <ChatBot />
          <Footer />
        </TitleProvider>
      </CartProvider>

    </main>
  );
}
