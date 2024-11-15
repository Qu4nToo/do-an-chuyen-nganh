import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
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
const categories = ["Hamburger", "Pizza", "Fries", "Chicken", "Hot Dog"];
interface MenuItem {
  id: number;
  img: string;
  title: string;
  current: boolean;
}
const menu: MenuItem[] =[
  {
    id: 1,
    img: "/btnBurger.png",
    title: "Hamburger",
    current: true,
  },
  {
    id: 2,
    img: "/btnFries.png",
    title: "Fries",
    current: false,
  },
  {
    id: 3,
    img: "/btnPizza.png",
    title: "Pizza",
    current: false,
  },
  {
    id: 4,
    img: "/btnChicken.png",
    title: "Chicken",
    current: false,
  },
  {
    id: 5,
    img: "/btnHotDog.png",
    title: "Hot Dog",
    current: false,
  },
];
export function ListProduct() {
  const [selectedTitle, setSelectedTitle] = useState<string>("Hamburger"); // Mặc định là Hamburger
  const [Menu, setMenu] = useState<MenuItem[]>(menu);
  // Hàm xử lý sự kiện onClick
  const handleClick = (title: string) => {
    setSelectedTitle(title); // Cập nhật state với title khi nhấn nút
    setMenu((prevMenu) =>
      prevMenu.map((item) => ({
        ...item,
        current: item.title === title,
      }))
    );
  };
  // Lọc sản phẩm dựa trên selectedTitle
  const result = products.filter((product) => product.title === selectedTitle);
  return (
    <>
      <div className="m-0 flex justify-center flex-row gap-5 lg:gap-24 items-center w-full p-10 lg:px-64 border-b-2 border-black">
        {Menu.map((item) => (
          <Button
            key={item.id}
            className={`md:h-32 md:w-32 h-14 w-14 flex flex-col p-5 gap-0 ${
              item.current ? "bg-orange-700" : "bg-orange-400 hover:bg-orange-700"
            }`}
            value={item.title}
            onClick={() => handleClick(item.title)}
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
      <div className="bg-white">
        <div className="mx-auto max-w-2xl sm:py-6 lg:max-w-7xl ">
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 justify-items-center">
            {result.map((item) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
import { useState } from "react";


