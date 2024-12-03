"use client";
import React from "react";
import Footer from "@/components/features/footer";
import {ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import ChatBot from "@/components/chatbotbubble";

export default function MenuPage() {
  return (
    <main>
      <Navbar />
      <ListProduct/>
      <Footer/>
      <ChatBot/>
    </main>
  );
}
