import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../ui/product-card";
export default function BestSeller() {
  return (
    <div className="w-full h-full pt-10 pb-10 px-10">
    <div className="m-0 flex items-start w-full p-auto lg:px-14">
      <p className="max-w-70xl pl-4 text-xl md:text-5xl font-bold text-red-700 dark:text-neutral-200 font-sans">
        BestSeller
      </p>
    </div>
    <div className="mx-auto p-0 md:p-5 gap-5 items-center p-auto w-auto">
      <Carousel>
        <CarouselContent className="md:p-11">
          <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex justify-center">
            <ProductCard />
          </CarouselItem>
        </CarouselContent>
        <div className="mt-4 container flex justify-center">
          <CarouselPrevious />
          <p>&ensp;</p>
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  </div>
  );
}
