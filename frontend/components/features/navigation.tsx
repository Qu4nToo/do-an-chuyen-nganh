import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/features/cart-context";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Menu", href: "/menu", current: false },
  { name: "Contact", href: "/about", current: false },
];

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { cart, removeFromCart } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Đăng xuất thành công!");
      router.push("/"); // Điều hướng về trang chủ
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Có lỗi xảy ra khi đăng xuất!");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <Disclosure
      as="nav"
      className="bg-white border-solid border-b-2 border-black h-auto sticky top-0 z-10"
    >
      <div className="container max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-auto">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start h-auto">
            <div className="flex flex-shrink-0 items-center lg:ml-10 lg:mr-20 md:mr-auto md:ml-5 mr-5 ml-3">
              <Link href="#">
                <img alt="Your Company" src="/logo.png" className="h-20 w-auto" />
              </Link>
            </div>
            <div className="hidden mx-auto sm:block md:flex md:items-center">
              <div className="flex space-x-4 w-auto">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "text-orange-500 hover:bg-gray-700 hover:text-white"
                        : "text-black hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 font-semibold lg:text-lg text-md"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <button
              type="button"
              onClick={toggleSidebar}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <FontAwesomeIcon icon={faCartShopping} className="h5 w-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    alt=""
                    src={user?.photoURL || "/user.png"}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-1 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {user ? (
                  <>
                    <MenuItem>
                      <span className="block px-4 py-2 text-sm text-gray-700">
                        {user.displayName || "Name"}
                      </span>
                    </MenuItem>

                    <MenuItem>
                      <span className="block px-4 py-2 text-sm text-gray-700">
                        {user.email || "Email"}
                      </span>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng nhập
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng ký
                      </a>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>


      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="fixed right-0 top-0 w-80 bg-white h-full shadow-lg z-30">
            <div className="flex justify-between items-center p-4">
              <center><h2 className="text-xl font-semibold">Your Cart</h2></center>
              <button
                onClick={closeSidebar}
                className="text-gray-700 hover:text-black"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-4 py-2">
              {/* chỗ sẽ xuất hiện danh sách sản phẩm đã thêm vào gio */}
            </div>
            <center>
              <div className="p-4">
                <ul>
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2"
                    >
                      <img
                        src={item.image}
                        className="w-12 h-12 object-cover"
                      />
                      <div className="flex-1 ml-3">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          Đơn giá: {item.price} VNĐ
                        </p>
                        <p className="text-xs text-gray-500">
                          Số lượng: x{item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          Giá tổng: {item.price * item.quantity}   VNĐ
                        </p>
                      </div>
                      <center>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </center>

                    </li>
                  ))}
                </ul>
                <div><hr /></div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-semibold">Total price:</span>
                  <span className="font-semibold text-xl">
                    {cart.reduce((total, item) => total + item.price * item.quantity, 0)} VNĐ
                  </span>
                </div>
                <Link href="/cart">
                  <button
                    className="bg-gradient-to-r from-[#FFA008] to-[#FF6F00] mt-6 text-white font-bold py-2 px-4 rounded" >
                    Check out
                  </button>
                </Link>
              </div>
            </center>
          </div>
        </div>
      )}
    </Disclosure>
  );
}