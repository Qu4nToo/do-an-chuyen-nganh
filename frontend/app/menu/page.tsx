"use client";
import React from "react";
import Footer from "@/components/features/footer";
import {ListProduct } from "@/components/features/list-product";
import Navbar from "@/components/features/navigation";
import cors from 'cors';

export default function MenuPage() {
  return (
    <main>
      
      <Navbar />
      <ListProduct/>
      <Footer/>
    </main>
  );
}
