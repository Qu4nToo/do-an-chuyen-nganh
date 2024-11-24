import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { userID, status, address, } = req.body;
    if (!userID || !status || !address) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }
    if (!status || !OrderStatus[status]) {
      return res.status(400).json({ error: 'status không hợp lệ' });
    }
    const newOrder = await prisma.order.create({
      data: {
        userID,
        address,
        status: OrderStatus[status],
        // status: status || OrderStatus.Pending, 
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
      return res.status(404).json({ error: 'Không tim thấy Order' });
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
    const { status, address } = req.body;

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ error: 'Status không hợp hệ' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status, address },
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