import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo Product mới
export const createProduct = async (req, res) => {
  try {
    const { title, description, calories, price, categoryID, image } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!title || !description || !calories || !price || !categoryID || !image) {
      return res.status(400).json({ error: 'Thiếu trường thông tin' });
    }

    // Tạo product mới
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        calories,
        image,
        price,
        categoryID,
      },
    });

    return res.status(200).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả các product
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Bao gồm thông tin category liên quan
        orderDetails: true, // Bao gồm thông tin chi tiết đơn hàng liên quan
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy Product theo ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true, // Bao gồm thông tin category liên quan
        orderDetails: true, // Bao gồm thông tin chi tiết đơn hàng liên quan
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy Product' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, calories, price, categoryID, image } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        calories,
        price,
        image,
        categoryID,
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tìm thấy Product' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Xóa Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Xóa Product
    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Xóa Product thành công' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tìm thấy Product' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
