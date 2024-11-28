import { Button } from "@/components/ui/button";
import Link from "next/link";

interface menu {
  id: number;
  img: string;
  title: string;
}
const menu = [
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
  return (
    <div className="w-full h-full bg-orange-50 pt-10 pb-20 px-10">
      <div className="m-0 flex justify-between items-start w-full p-auto lg:px-14 mb-14">
        <p className="max-w-70xl pl-4 text-xl md:text-5xl font-bold text-red-700 dark:text-neutral-200 font-sans">
          Category
        </p>
        <Link
          href="/menu"
          className="text-xl md:text-3xl text-yellow-500 font-bold hover:text-orange-300"
        >
          View All
        </Link>
      </div>
      <div className="m-0 flex justify-center flex-row gap-5 lg:gap-20 items-center w-full p-10 lg:px-64 border-b-2 border-black">
        {menu.map((item) => (
          <Button
            key={item.id}
            id={item.title}
            className="md:h-32 md:w-32 h-14 w-14 bg-orange-400 hover:bg-orange-700 flex flex-col p-5 gap-0"
          >
            <img
              src={item.img}
              alt=""
              className="w-full h-full md:w-[80%] md:h-[80%] object-fill"
            />
            <p className="md:text-xl font-bold text-xs">{item.title}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
