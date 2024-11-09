"use client";

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

export default function BannerCard() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <div className="flex flex-col items-center bg-gradient-to-r from-orange-300 to-orange-500 p-10  rounded-lg shadow-lg md:flex-row pt-10 pb-10 mx-auto mt-10 mb-4 h-auto w-auto ">
            <div className="flex flex-col justify-between p-auto lg:p-24 leading-normal">
              <h1 className="text-6xl font-bold text-red-600 mb-0">
                Ăn gì hôm nay?
              </h1>
              <p className="mt-4 text-lg text-white">
                Nếu bạn chưa biết nên ăn gì thì hãy đến và order ngay. Để có thể
                thưởng thức những món ăn ngon và vô cùng hấp dẫn.
              </p>
              <Button className="w-40 mt-4 bg-orange-600 font-bold">
                Order Now
              </Button>
            </div>
            <img
              className="object-center w-auto h-auto md:h-[40%] md:w-[40%] rounded-xl m-auto mt-3 md:m-10"
              src="/banner.png"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col items-center bg-gradient-to-r from-orange-300 to-orange-500 p-10  rounded-lg shadow-lg md:flex-row pt-10 pb-10 mx-auto mt-10 mb-4 h-auto w-auto ">
            <div className="flex flex-col justify-between p-auto lg:p-24 leading-normal">
              <h1 className="text-6xl font-bold text-red-600 mb-0">
                Ăn gì hôm nay?
              </h1>
              <p className="mt-4 text-lg text-white">
                Nếu bạn chưa biết nên ăn gì thì hãy đến và order ngay. Để có thể
                thưởng thức những món ăn ngon và vô cùng hấp dẫn.
              </p>
              <Button className="w-40 mt-4 bg-orange-600 font-bold">
                Order Now
              </Button>
            </div>
            <img
              className="object-center w-auto h-auto md:h-[40%] md:w-[40%] rounded-xl m-auto mt-3 md:m-10"
              src="/banner.png"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col items-center bg-gradient-to-r from-orange-300 to-orange-500 p-10  rounded-lg shadow-lg md:flex-row pt-10 pb-10 mx-auto mt-10 mb-4 h-auto w-auto ">
            <div className="flex flex-col justify-between p-auto lg:p-24 leading-normal">
              <h1 className="text-6xl font-bold text-red-600 mb-0">
                Ăn gì hôm nay?
              </h1>
              <p className="mt-4 text-lg text-white">
                Nếu bạn chưa biết nên ăn gì thì hãy đến và order ngay. Để có thể
                thưởng thức những món ăn ngon và vô cùng hấp dẫn.
              </p>
              <Button className="w-40 mt-4 bg-orange-600 font-bold">
                Order Now
              </Button>
            </div>
            <img
              className="object-center w-auto h-auto md:h-[40%] md:w-[40%] rounded-xl m-auto mt-3 md:m-10"
              src="/banner.png"
              alt=""
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <div className="mt-4 container flex justify-center">
        <CarouselPrevious />  
        <p>&ensp;</p>
        <CarouselNext />
      </div>
    </Carousel>
  );
}
