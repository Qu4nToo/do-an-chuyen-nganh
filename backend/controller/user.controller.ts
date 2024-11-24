import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo người dùng mới
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, passWord, phoneNumber, address, email, roleID } = req.body;

    // Kiểm tra nếu thiếu thông tin
    if (!firstName || !lastName || !passWord || !phoneNumber || !address || !email || !roleID) {
      return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
    }

    // Kiểm tra định dạng phoneNumber và email
    const phoneRegex = /^[0-9]{10}$/; // Đảm bảo phoneNumber chỉ bao gồm 10 chữ số
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: 'Số điện thoại phải gồm 10 chữ số' });
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        passWord,
        phoneNumber,
        address,
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
      return res.status(404).json({ error: 'User not found' });
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
    const { firstName, lastName, passWord, phoneNumber, address, email, roleID } = req.body;

    // Kiểm tra định dạng phoneNumber
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: 'Số điện thoại phải gồm 10 chữ số' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        passWord,
        phoneNumber,
        address,
        email,
        roleID,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
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

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};