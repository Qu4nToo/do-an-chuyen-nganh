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
router.post('/create', createOrder); // Tạo Order mới
router.get('/get', getOrders); // Lấy danh sách Order
router.get('/get/:id', getOrderById); // Lấy Order theo ID
router.put('/update/:id', updateOrder); // Cập nhật Order
router.delete('/delete/:id', deleteOrder); // Xóa Order

export default router;