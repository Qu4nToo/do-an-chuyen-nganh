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
router.post('/create', createRole); // Tạo Role mới
router.get('/get', getRoles); // Lấy danh sách Role
router.get('/get/:id', getRoleById); // Lấy Role theo ID
router.put('/update/:id', updateRole); // Cập nhật Role
router.delete('/delete/:id', deleteRole); // Xóa Role

export default router;