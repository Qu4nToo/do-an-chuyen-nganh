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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
interface Product {
  id: number;
  img: string;
  title: string;
  name: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 2,
    img: "/burger.png",
    title: "Pizza",
    name: "Fried Chicken Pizza",
    price: "200000",
  },
  {
    id: 3,
    img: "/burger.png",
    title: "Fries",
    name: "Cheese Fries",
    price: "100000",
  },
  {
    id: 4,
    img: "/burger.png",
    title: "Chicken",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 5,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 6,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 7,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 8,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 9,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
  {
    id: 10,
    img: "/burger.png",
    title: "Hamburger",
    name: "Fried Chicken Burger",
    price: "100000",
  },
];
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
            {products.map((item) => (
              <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/3 flex justify-center">
                <div
                  key={item.id}
                  className="w-80 h-auto bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 flex flex-col p-5 items-center"
                >
                  <img
                    className="rounded-t-lg items-center w-60 h-auto"
                    src={item.img}
                    alt=""
                  />
                  <div className="px-5 pt-5">
                    <p className="text-center mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mb-1 text-2xl font-normal text-black dark:text-gray-400 text-center">
                      {item.name}
                    </p>
                    <p className="mb-3 text-2xl font-normal text-yellow-400 dark:text-gray-400 text-center">
                      {item.price} VND
                    </p>
                  </div>
                  <div className="flex gap-10 pb-5">
                    <Button className=" bg-red-600 hover:bg-orange-400 rounded-full md:w-10 md:h-10 w-auto h-auto">
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button className=" bg-red-600 pl-4  hover:bg-orange-400 gap-0">
                      <p className="text-xl font-bold">Buy Now</p>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
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
