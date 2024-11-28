import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";



interface MenuItem {
  id: string,
  title: string;
  current: boolean
};

export function ListProduct() {


  const [selectedTitle, setSelectedTitle] = useState<string>("ALL");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/product/get")
      .then((response) => setProducts(response.data))
      .catch((err) => console.error("Error fetching products:", err));

    axios
      .get("http://localhost:5000/api/admin/category/get")
      .then((response) => {
        setCategories(response.data);

        // Khởi tạo menu từ danh mục sau khi tải xong
        const initialMenu: MenuItem[] = [
          {
            id: "1",
            title: "ALL",
            current: true, // Mặc định chọn "ALL"
          },
          ...response.data.map((category: any) => ({
            id: category.id,
            title: category.categoryName,
            current: false,
          })),
        ];
        setMenu(initialMenu);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Hàm xử lý sự kiện khi chọn danh mục
  const handleClick = (title: string) => {
    setSelectedTitle(title); // Cập nhật danh mục được chọn

    // Cập nhật trạng thái menu
    setMenu((prevMenu) =>
      (prevMenu || []).map((item) => ({
        ...item,
        current: item.title === title, // Đặt `current: true` nếu title trùng với title được chọn, ngược lại là false
      }))
    );
  };

  // Lọc sản phẩm dựa trên danh mục được chọn
  const filteredProducts =
    selectedTitle === "ALL"
      ? products // Hiển thị toàn bộ sản phẩm nếu "ALL" được chọn
      : products.filter(
          (product: any) => product.category.categoryName === selectedTitle
        );

  return (
    <>
      <div className="m-0 flex justify-center flex-row gap-5 lg:gap-24 items-center w-full p-10 lg:px-64 border-b-2 border-black">
        {menu.map((item: any) => (
          <Button
            key={item.id}
            className={`md:h-32 md:w-32 h-14 w-14 flex flex-col p-5 gap-0 ${item.current ? "bg-orange-700" : "bg-orange-400 hover:bg-orange-700"
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
            {filteredProducts.map((item: any) => (
              <div
                key={item.id}
                className="w-80 h-auto bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 flex flex-col p-5 items-center"
              >
                <img
                  className="rounded-t-lg items-center w-60 h-auto"
                  src={item.image}
                  alt=""
                />
                <div className="px-5 pt-5">
                  <p className="text-center mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.category.categoryName}
                  </p>
                  <p className="mb-1 text-2xl font-normal text-black dark:text-gray-400 text-center">
                    {item.title}
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
import { useEffect, useState } from "react";
import axios from "axios";
import { menu } from "@material-tailwind/react";
import category from "./category";
import { any } from "zod";


