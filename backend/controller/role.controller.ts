import { PrismaClient, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

// Tạo role mới
export const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    // Kiểm tra input
    if (!roleName || !RoleName[roleName]) {
      return res.status(400).json({ error: 'Role name không hợp lệ' });
    }

    // Tạo role mới
    const newRole = await prisma.role.create({
      data: {
        roleName: RoleName[roleName], // Gán giá trị của enum RoleName
      },
    });

    return res.status(200).json(newRole);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả các role
export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        users: true, // Bao gồm thông tin người dùng liên kết với role này
      },
    });

    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy role theo ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        users: true, // Bao gồm thông tin người dùng
      },
    });

    if (!role) {
      return res.status(404).json({ error: 'không tìm thấy Role' });
    }

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    // Kiểm tra nếu roleName không hợp lệ
    if (roleName && !RoleName[roleName]) {
      return res.status(400).json({ error: 'tên role không hợp lệ' });
    }

    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        roleName: roleName ? RoleName[roleName] : undefined, // Cập nhật roleName nếu có
      },
    });

    return res.status(200).json(updatedRole);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'không tìm thấy Role' });
    }
    return res.status(500).json({ error: error.message });
  }
};

// Xóa role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.role.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Xóa Role thành công' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'không tìm thấy Role' });
    }
    return res.status(500).json({ error: error.message });
  }
};