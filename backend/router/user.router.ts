import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controller/user.controller';

const router = express.Router();

// Định nghĩa các route cho User
router.post('/create', createUser); // Tạo User mới
router.get('/get', getUsers); // Lấy danh sách User
router.get('/get/:id', getUserById); // Lấy User theo ID
router.put('/update/:id', updateUser); // Cập nhật User
router.delete('/delete/:id', deleteUser); // Xóa User

export default router;