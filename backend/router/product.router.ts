import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controller/product.controller';

const router = express.Router();

// Định nghĩa các route cho Product
router.post('/create', createProduct); // Tạo Product mới
router.get('/get', getProducts); // Lấy danh sách Product
router.get('/get/:id', getProductById); // Lấy Product theo ID
router.put('/update/:id', updateProduct); // Cập nhật Product
router.delete('/delete/:id', deleteProduct); // Xóa Product

export default router;