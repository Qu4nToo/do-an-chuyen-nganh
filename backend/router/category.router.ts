import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controller/category.controller';

const router = express.Router();

// Định nghĩa các route cho Category
router.post('/create', createCategory); // Tạo category mới
router.get('/get', getCategories); // Lấy danh sách category
router.get('/get/:id', getCategoryById); // Lấy category theo ID
router.put('/update/:id', updateCategory); // Cập nhật category
router.delete('/delete/:id', deleteCategory); // Xóa category

export default router;