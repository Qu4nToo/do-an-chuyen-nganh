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
router.post('/products', createProduct); // Tạo product mới
router.get('/products', getProducts); // Lấy danh sách product
router.get('/products/:id', getProductById); // Lấy product theo ID
router.put('/products/:id', updateProduct); // Cập nhật product
router.delete('/products/:id', deleteProduct); // Xóa product

export default router;