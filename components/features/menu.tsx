import Link from "next/link";
import { Button } from "../ui/button";

export default function Menu() {
  return (
    <div className="m-0 flex justify-center flex-row gap-5 lg:gap-24 items-center w-full p-10 lg:px-64 border-b-2 border-black">
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
  );
}
