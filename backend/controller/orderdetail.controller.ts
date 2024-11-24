import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo OrderDetail mới
export const createOrderDetail = async (req, res) => {
  try {
    const { orderID, productID, totalPrice, quantity, orderDate } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!orderID || !productID || totalPrice === undefined || quantity === undefined || !orderDate) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }

    // Tạo OrderDetail mới
    const newOrderDetail = await prisma.orderDetail.create({
      data: {
        orderID,
        productID,
        totalPrice,
        quantity,
        orderDate,
      },
    });

    return res.status(200).json(newOrderDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả OrderDetail
export const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await prisma.orderDetail.findMany({
      include: {
        order: true, // Bao gồm thông tin order liên quan
        product: true, // Bao gồm thông tin product liên quan
      },
    });

    return res.status(200).json(orderDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy OrderDetail theo orderID và productID
export const getOrderDetailById = async (req, res) => {
  try {
    const { orderID, productID } = req.params;

    const orderDetail = await prisma.orderDetail.findUnique({
      where: {
        orderID_productID: {
          orderID,
          productID,
        },
      },
      include: {
        order: true, // Bao gồm thông tin order liên quan
        product: true, // Bao gồm thông tin product liên quan
      },
    });

    if (!orderDetail) {
      return res.status(404).json({ error: 'OrderDetail not found' });
    }

    return res.status(200).json(orderDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin OrderDetail
export const updateOrderDetail = async (req, res) => {
  try {
    const { orderID, productID } = req.params;
    const { totalPrice, quantity, orderDate } = req.body;

    const updatedOrderDetail = await prisma.orderDetail.update({
      where: {
        orderID_productID: {
          orderID,
          productID,
        },
      },
      data: {
        totalPrice,
        quantity,
        orderDate,
      },
    });

    return res.status(200).json(updatedOrderDetail);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'OrderDetail not found' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Xóa OrderDetail
export const deleteOrderDetail = async (req, res) => {
  try {
    const { orderID, productID } = req.params;

    await prisma.orderDetail.delete({
      where: {
        orderID_productID: {
          orderID,
          productID,
        },
      },
    });

    return res.status(200).json({ message: 'OrderDetail deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'OrderDetail not found' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
