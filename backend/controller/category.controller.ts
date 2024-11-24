import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo Category mới
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Kiểm tra trường dữ liệu
    if (!categoryName) {
      return res.status(400).json({ error: 'tên Category là bắt buộc' });
    }

    // Tạo category mới
    const newCategory = await prisma.category.create({
      data: {
        categoryName,
      },
    });

    return res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả các category
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true, // Bao gồm thông tin sản phẩm liên quan
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy Category theo ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true, // Bao gồm thông tin sản phẩm liên quan
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Không tìm thấy Category' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        categoryName,
      },
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tìm thấy Category' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Xóa Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Xóa Category
    await prisma.category.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Xóa Category thành công' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tìm thấy Category' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
