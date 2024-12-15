import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/features/cart-context';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from '../ui/use-toast';

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    roleID: 0,
  });
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notice, setNotice] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('internetBanking');
  const { cart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOrderSaved, setIsOrderSaved] = useState(false); // Track if the order is saved
  const [currentStep, setCurrentStep] = useState(1); // Track the current step (1: Cart, 2: Order Info, 3: Payment)

  useEffect(() => {
    // Retrieve the user_info from sessionStorage
    const storedUserInfo = sessionStorage.getItem('user_info');
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo);
      setUserInfo(user);
    }

    // Set total amount from the cart
    setTotalAmount(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  }, [cart]);

  const handleSaveOrder = async () => {
    if (!phone.trim() || !address.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a valid phone number and address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create the order and get the orderID
      const orderResponse = await axios.post('http://localhost:5000/api/admin/order/create', {
        userID: userInfo.id,
        status: 'Pending',
        address,
        phone,
        notice: notice || 'No notice',
        orderDate: new Date().toISOString(),
        totalAmount,
      });

      if (orderResponse.status === 200) {
        const orderID = orderResponse.data.; // Get the orderID from the response

        // Save orderID in sessionStorage
        sessionStorage.setItem('orderID', orderID);
        setIsOrderSaved(true); // Mark the order as saved

        // Move to the next step (Order Info -> Payment)
        setCurrentStep(2); // Step 2 now (Order Info)

        toast({
          title: 'Order Saved',
          description: 'Your order has been saved successfully.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create order.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error details:', error.response?.data); // Log the error response
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'An error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!isOrderSaved) {
      toast({
        title: 'Error',
        description: 'Please save the order first.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Retrieve the orderID from sessionStorage
      const orderID = sessionStorage.getItem('orderID');
      if (!orderID) {
        toast({
          title: 'Error',
          description: 'Order ID is missing.',
          variant: 'destructive',
        });
        return;
      }

      // Step 2: Create order details using the orderID
      const orderDetailsPromises = cart.map((item) => {
        return axios.post('http://localhost:5000/api/admin/orderdetail/create', {
          orderID: orderID,  // Pass the orderID here
          productID: item.id,
          totalPrice: item.price * item.quantity,
          quantity: item.quantity,
        });
      });

      // Wait for all order details to be created
      const detailsResponses = await Promise.all(orderDetailsPromises);

      // Step 3: Check if all order details were successfully created
      const allSuccess = detailsResponses.every(response => response.status === 200);
      if (allSuccess) {
        toast({
          title: 'Success',
          description: 'Order created successfully with all details!',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Some order details failed to save.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error details:', error.response?.data); // Log the error response
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'An error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create progress steps based on currentStep value
  const renderProgressSteps = () => {
    const steps = [
      { label: 'Giỏ hàng', completed: currentStep >= 1 },
      { label: 'Thông tin đặt hàng', completed: currentStep >= 2 },
      { label: 'Thanh toán', completed: currentStep >= 3 },
    ];

    return (
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full ${step.completed ? 'bg-red-500' : 'bg-gray-500'} flex justify-center items-center`}
            >
              <span className="text-white text-lg">{index + 1}</span>
            </div>
            <span className={`mt-2 ${step.completed ? 'text-red-500' : 'text-gray-500'}`}>{step.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[url('/background.jpg')] py-4">
      <div className="checkout-page flex flex-col items-center space-y-6 p-4 border mx-auto">
        <div className="p-3 md:py-10 md:px-40 w-auto border-2 bg-white border-black rounded-md">
          {/* Render progress steps */}
          {renderProgressSteps()}

          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" value={userInfo.name} readOnly />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your Email" value={userInfo.email} readOnly />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Shipping Address</Label>
                <Input
                  id="address"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="notice">Notice</Label>
                <Input
                  id="notice"
                  placeholder="Your Notice"
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 mt-5">Products</h2>
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-2 border border-gray-300 rounded-lg shadow-md p-3 mb-2"
                >
                  <img src={item.image} className="w-12 h-12 object-cover" alt={item.title} />
                  <div className="flex-1 ml-3">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <div className="text-s text-amber-500 font-semibold">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                    <FaRegTrashAlt />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col border border-gray-300 rounded-lg shadow-md p-3 mb-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Quantity:</span>
                <span className="font-semibold text-xl">
                  {cart.reduce((total, item) => total + item.quantity, 0).toLocaleString('vi-VN')} Item(s)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total price:</span>
                <span className="font-semibold text-xl">
                  {totalAmount.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mt-5">
            <div className="payment-method bg-gradient-to-r from-[#FFA008] to-[#FF6F00] text-white p-10">
              <h1 className="text-2xl mb-4">Payment Method</h1>
              <div className="flex justify-center space-x-8 mt-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="internetBanking"
                    name="paymentMethod"
                    value="internetBanking"
                    checked={selectedMethod === 'internetBanking'}
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
                    checked={selectedMethod === 'cod'}
                    onChange={() => setSelectedMethod('cod')}
                  />
                  <label htmlFor="cod" className="ml-2">
                    Cash on Delivery
                  </label>
                </div>
              </div>

              <div className="mt-4 md:text-2xl">
                Total: {totalAmount.toLocaleString('vi-VN')} VNĐ
              </div>

              {/* Step 2: Show 'Save Order' button first, then 'Checkout' button */}
              {!isOrderSaved ? (
                <Button
                  className="bg-black text-white mt-5 mb-4 font-bold w-96 hover:bg-white hover:text-black"
                  onClick={handleSaveOrder}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Order'}
                </Button>
              ) : (
                <Button
                  className="bg-black text-white mt-5 mb-4 font-bold w-96 hover:bg-white hover:text-black"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
