"use client";
import React from "react";

import Category from "@/components/features/category";
import Navbar from "@/components/features/navigation";
import BannerCard from "@/components/features/banner";
import BestSeller from "@/components/features/best-seller";
import Footer from "@/components/features/footer";


export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className="w-5/6 h-full mx-auto">
        <BannerCard/>
      </div>
      <Category/>
      <BestSeller/>
      <Footer/>
    </main>
  );
}
