"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTitle } from "./TitleContext";
import { button } from "@material-tailwind/react";

interface MenuItem {
  id: number;
  img: string;
  title: string;

}

const menu: MenuItem[] = [
  {
    id: 1,
    img: "/btnBurger.png",
    title: "Burger",

  },
  {
    id: 2,
    img: "/btnFries.png",
    title: "Fries",

  },
  {
    id: 3,
    img: "/btnPizza.png",
    title: "Pizza",

  },
  {
    id: 4,
    img: "/btnChicken.png",
    title: "Chicken",

  },
  {
    id: 5,
    img: "/btnHotDog.png",
    title: "Hot Dog",

  },
];

export default function Category() {
  const { title, setTitle } = useTitle();

  const handleButtonClick = (title: string) => {
     // Lưu `title` vào Context
     setTitle(title);
  };
  return (
    
    <div className="w-full h-full bg-orange-50 pt-10 pb-20 px-10">
      <div className="m-0 flex justify-between items-start w-full p-auto lg:px-14 mb-14">
        <p className="max-w-70xl pl-4 text-xl md:text-5xl font-bold text-red-700 dark:text-neutral-200 font-sans">
          Category
        </p>
        <Link
          href="/menu"
          className="text-xl md:text-3xl text-yellow-500 font-bold hover:text-orange-300"
          onClick={() => setTitle("ALL")} 
        >
          View All
        </Link>
      </div>
      <div className="m-0 flex justify-center flex-row gap-2 md:gap-6 lg:gap-24 items-center w-full p-10 lg:px-auto border-b-2 border-black">
        {menu.map((item) => (
          <Link href="/menu">
            <Button
              onClick={() => handleButtonClick(item.title)}
              id={item.title}
              className="md:h-20 md:w-20 lg:h-32 lg:w-32  h-14 w-14 flex flex-col p-5 gap-0 bg-orange-400 hover:bg-orange-700"
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full md:w-[80%] md:h-[80%] object-fill"
              />
              <p className="md:text-xl font-bold text-xs">{item.title}</p>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
