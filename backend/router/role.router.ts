import express from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from '../controller/role.controller';

const router = express.Router();

// Định nghĩa các route cho Role
router.post('/roles', createRole); // Tạo role mới
router.get('/roles', getRoles); // Lấy danh sách role
router.get('/roles/:id', getRoleById); // Lấy role theo ID
router.put('/roles/:id', updateRole); // Cập nhật role
router.delete('/roles/:id', deleteRole); // Xóa role

export default router;