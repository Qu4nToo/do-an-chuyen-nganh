import { PrismaClient, OrderStatus } from '@prisma/client';
const prisma = new PrismaClient();

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { userID, status, address, phone, notice, orderDate, totalAmount } = req.body;
    const onlyDate = new Date(orderDate.toISOString().split('T')[0]);
    console.log(onlyDate);
    if (!userID || !status || !address || !phone || !notice || !orderDate || !totalAmount) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }
    if (!status || !OrderStatus[status]) {
      return res.status(400).json({ error: 'status không hợp lệ' });
    }
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Phone number must contain only digits' });
    }
    const newOrder = await prisma.order.create({
      data: {
        userID,
        address,
        status: OrderStatus[status],
        // status: status || OrderStatus.Pending, 
        phone,
        notice,
        orderDate: onlyDate,
        totalAmount,
      },
    });

    return res.status(200).json(newOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách các đơn hàng
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,          // Bao gồm thông tin người dùng
        coupons: true,       // Bao gồm thông tin các coupon
        orderDetails: true,  // Bao gồm thông tin chi tiết đơn hàng
      },
    });

    // Chỉ giữ lại ngày, tháng, năm của `orderDate`
    const formattedOrders = orders.map(order => ({
      ...order,
      orderDate: order.orderDate.toISOString().split('T')[0], // Chỉ giữ lại YYYY-MM-DD
    }));

    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,          // Bao gồm thông tin người dùng
        coupons: true,       // Bao gồm thông tin các coupon
        orderDetails: true,  // Bao gồm thông tin chi tiết đơn hàng
      },
    });
    const formattedOrders = order => ({
      ...order,
      orderDate: order.orderDate.toISOString().split('T')[0], // Chỉ giữ lại YYYY-MM-DD
    });
    if (!order) {
      return res.status(404).json({ error: 'Không tim thấy Order' });
    }
    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID, status, address, phone, notice, orderDate, totalAmount } = req.body;
    const onlyDate = new Date(orderDate.toISOString().split('T')[0]);
    if (!userID || !status || !address || !phone || !notice || !orderDate || !totalAmount) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }
    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ error: 'Status không hợp hệ' });
    }
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Phone number must contain only digits' });
    }
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { userID, status, address, phone, notice, orderDate: onlyDate, totalAmount },
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tim thấy Order' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Xóa Order thành công' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tim thấy Order' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};