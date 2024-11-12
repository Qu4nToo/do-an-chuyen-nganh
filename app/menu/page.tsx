"use client";
import React from "react";
import Footer from "@/components/features/footer";
import ListProduct from "@/components/features/list-product";
import Menu from "@/components/features/menu";
import Navbar from "@/components/features/navigation";

export default function MenuPage() {
  return (
    <main>
      <Navbar />
      <Menu/>
      <ListProduct/>
      <Footer/>
    </main>
  );
}
