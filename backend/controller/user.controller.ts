import { PrismaClient } from '@prisma/client';
import validator from 'validator';
const prisma = new PrismaClient();

// Tạo người dùng mới
export const createUser = async (req, res) => {
  try {
    const { name, passWord, email, roleID } = req.body;

    // Kiểm tra nếu thiếu thông tin
    if (!name || !passWord || !email || !roleID) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Địa chỉ email không hợp lệ' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        passWord,
        email,
        roleID,
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách người dùng
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,  // Bao gồm thông tin role
        orders: true, // Bao gồm thông tin orders của user
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        orders: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Không tim thấy User' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, passWord, email, roleID } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Địa chỉ email không hợp lệ' });
    }
    if (!name || !passWord || !email || !roleID) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        passWord,
        email,
        roleID,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tim thấy User' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Xóa User thành công' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Không tim thấy User' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};