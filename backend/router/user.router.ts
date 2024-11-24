import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controller/user.controller';

const router = express.Router();

// Định nghĩa các route cho Users
router.post('/users', createUser); // Tạo user mới
router.get('/users', getUsers); // Lấy danh sách user
router.get('/users/:id', getUserById); // Lấy user theo ID
router.put('/users/:id', updateUser); // Cập nhật user
router.delete('/users/:id', deleteUser); // Xóa user

export default router;