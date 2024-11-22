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
router.post('/categories', createCategory); // Tạo category mới
router.get('/categories', getCategories); // Lấy danh sách category
router.get('/categories/:id', getCategoryById); // Lấy category theo ID
router.put('/categories/:id', updateCategory); // Cập nhật category
router.delete('/categories/:id', deleteCategory); // Xóa category

export default router;