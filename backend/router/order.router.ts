import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controller/order.controller';

const router = express.Router();

// Định nghĩa các route cho Order
router.post('/orders', createOrder); // Tạo order mới
router.get('/orders', getOrders); // Lấy danh sách order
router.get('/orders/:id', getOrderById); // Lấy order theo ID
router.put('/orders/:id', updateOrder); // Cập nhật order
router.delete('/orders/:id', deleteOrder); // Xóa order

export default router;