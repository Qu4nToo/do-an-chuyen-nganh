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
router.post('/order-details', createOrderDetail); // Tạo OrderDetail mới
router.get('/order-details', getOrderDetails); // Lấy danh sách OrderDetails
router.get('/order-details/:orderID/:productID', getOrderDetailById); // Lấy OrderDetail theo ID
router.put('/order-details/:orderID/:productID', updateOrderDetail); // Cập nhật OrderDetail
router.delete('/order-details/:orderID/:productID', deleteOrderDetail); // Xóa OrderDetail

export default router;
