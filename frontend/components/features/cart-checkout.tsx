import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { auth, provider } from '@/app/firebase/config'; // Import Firebase setup
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/components/features/cart-context";
import { Button } from '../ui/button';
import { FaRegTrashAlt } from 'react-icons/fa';


const CheckoutPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userdisplayName, setUserDisplayName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const { cart, removeFromCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(); //
  let total = 0;
  const handleCheckout = async () => {
    try {
      // Gọi API để tạo payment URL
      const response = `http://localhost:5000/order/create_payment_url?amount=${total}`

      // Kiểm tra nếu API trả về paymentUrl
      const paymentUrl = response;

      if (paymentUrl) {
        // Chuyển hướng người dùng đến paymentUrl
        window.location.href = paymentUrl;  // Chuyển hướng tới URL thanh toán
      } else {
        console.log(paymentUrl);
        alert("Có lỗi xảy ra khi tạo URL thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
    }
  };
  const [userInfo, setUserInfo] = useState<any>(null);
  // Lấy sản phẩm từ API khi component mount
  useEffect(() => {
    // Retrieve the user_info from sessionStorage
    const storedUserInfo = sessionStorage.getItem("user_info");

    if (storedUserInfo) {
      // If user_info exists, parse it into an object
      const user = JSON.parse(storedUserInfo);
      setUserInfo(user);
    }
  }, []);

  const formatPrice = (price: number): string => {
    // Kiểm tra giá trị đầu vào
    if (isNaN(price)) {
      throw new Error("Giá trị không hợp lệ");
    }

    // Định dạng giá sử dụng Intl.NumberFormat
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0, // Không có phần thập phân
    });

    // Loại bỏ ký hiệu "₫" mặc định
    return formatter.format(price).replace('₫', 'VND').trim();
  };
  return (
    <div className="checkout-page flex flex-col items-center space-y-6 p-4 border mx-auto">
      <div className="p-3 md:py-10 md:px-40 w-auto border-2 border-black rounded-md">
        {/* Header */}
        <div className="flex justify-center space-x-4">
          <FaCartShopping className="text-4xl" />
          <p className="font-bold text-4xl">MY CART</p>
        </div>

        {/* Billing Information */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
          <div className="space-y-4">
            {userInfo ? (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" value={userInfo.name || ''} readOnly />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your Email" value={userInfo.email || ''} readOnly />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your Email" />
                </div>
              </>
            )
            }

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={phoneNumber || ''}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Shipping Address</Label>
              <Input id="address" placeholder="Your Address" />
            </div>
            <div>
              <Label htmlFor="notice">Notice</Label>
              <Input id="notice" placeholder="Your notice" />
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <ul className="space-y-4">
            {cart.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-4 border rounded-md"
                >
                  <img
                    src={item.image}
                    className="w-12 h-12 object-cover"
                    alt={item.title}
                  />
                  <div className="flex-1 ml-3">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-gray-500">Price: {formatPrice(item.price)} </p>
                    <p className="text-xs text-gray-500">Quantity: x{item.quantity}</p>
                    <p className="text-xs text-gray-500">Total: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </li>
              )
            })}
            <div><hr /></div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">Total price:</span>
              <span className="font-semibold text-xl">
                {formatPrice(total = cart.reduce((total, item) => total + item.price * item.quantity, 0))}
              </span>
            </div>
          </ul>
        </div>

        {/* Payment Method */}
        <div className="w-full max-w-md mt-5">
          <div className="payment-method bg-gradient-to-r from-[#FFA008] to-[#FF6F00] text-white p-10">
            <h1 className="text-2xl mb-4">Phương thức thanh toán</h1>
            <div className="flex justify-center space-x-8 mt-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="internetBanking"
                  name="paymentMethod"
                  value="internetBanking"
                  defaultChecked
                  onChange={() => setSelectedMethod('internetBanking')}
                />
                <label htmlFor="internetBanking" className="ml-2">
                  Internet Banking
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  onChange={() => setSelectedMethod('cod')}
                />
                <label htmlFor="cod" className="ml-2">
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>
            <div className="mt-4 md:text-2xl">
              <p>Tổng tiền: {formatPrice(total)}</p>
            </div>

            <Button
              className="bg-black text-white mt-5 mb-4 font-bold w-96 hover:bg-white hover:text-black"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
