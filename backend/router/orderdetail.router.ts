import express from 'express';
import {
  createOrderDetail,
  getOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail,
} from '../controller/orderdetail.controller';

const router = express.Router();

// Định nghĩa các route cho OrderDetail
router.post('/create', createOrderDetail); // Tạo OrderDetail mới
router.get('/get', getOrderDetails); // Lấy danh sách OrderDetail
router.get('/get/:orderID/:productID', getOrderDetailById); // Lấy OrderDetail theo ID
router.put('/update/:orderID/:productID', updateOrderDetail);
router.delete('/delete/:orderID/:productID', deleteOrderDetail); // Xóa OrderDetail

export default router;
