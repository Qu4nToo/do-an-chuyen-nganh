import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Category() {
  return (
    <div className="w-full h-full bg-orange-50 pt-10 pb-20 px-10">
      <div className="m-0 flex justify-between items-start w-full p-auto lg:px-14 mb-14">
        <p className="max-w-70xl pl-4 text-xl md:text-5xl font-bold text-red-700 dark:text-neutral-200 font-sans">
          Category
        </p>
        <Link
          href="#"
          className="text-xl md:text-3xl text-yellow-500 font-bold hover:text-orange-300"
        >
          View All
        </Link>
      </div>
      <div className="m-0 flex justify-center flex-row gap-5 lg:gap-24 items-center w-full p-auto lg:px-64">
        <Link href="#">
          <Button className="md:h-32 md:w-32 h-14 w-14 bg-orange-400 hover:bg-orange-700 flex flex-col p-5 gap-0">
            <img
              src="/btnBurger.png"
              alt=""
              className="w-full h-full md:w-[80%] md:h-[80%] object-fill"
            />
            <p className="md:text-xl font-bold text-xs">Burger</p>
          </Button>
        </Link>
        <Link href="#">
          <Button className="md:h-32 md:w-32 h-14 w-14 bg-orange-400 hover:bg-orange-700 flex flex-col p-5 gap-0">
            <img
              src="/btnFries.png"
              alt=""
              className="md:w-[80%] md:h-[80%] object-fill"
            />
            <p className="md:text-xl font-bold text-xs">Fries</p>
          </Button>
        </Link>
        <Link href="#">
          <Button className="md:h-32 md:w-32 h-14 w-14 bg-orange-400 hover:bg-orange-700 flex flex-col p-5 gap-0">
            <img
              src="/btnPizza.png"
              alt=""
              className="md:w-[80%] md:h-[80%] object-fill"
            />
            <p className="md:text-xl font-bold text-xs">Pizza</p>
          </Button>
        </Link>
        <Link href="#">
          <Button className="md:h-32 md:w-32 h-14 w-14 bg-orange-400 hover:bg-orange-700 flex flex-col p-5 gap-0">
            <img
              src="/btnChicken.png"
              alt=""
              className="md:w-[80%] md:h-[80%] object-fill"
            />
            <p className="md:text-xl font-bold text-xs">Chicken</p>
          </Button>
        </Link>
        <Link href="#">
          <Button className="md:h-32 md:w-32 h-14 w-14 bg-orange-400 hover:bg-orange-700 flex flex-col p-5 gap-0">
            <img
              src="/btnHotDog.png"
              alt=""
              className="md:w-[80%] md:h-[80%] object-fill"
            />
            <p className="md:text-xl font-bold text-xs">Hot Dog</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
