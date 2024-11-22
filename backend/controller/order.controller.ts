import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { userID, status, } = req.body;

    const newOrder = await prisma.order.create({
      data: {
        userID,
        status: status || OrderStatus.PENDING,  // Nếu không có status thì mặc định là PENDING
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

    return res.status(200).json(orders);
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

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
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

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};