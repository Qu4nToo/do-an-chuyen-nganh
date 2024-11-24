import express from 'express';
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from '../controller/coupon.controller';

const router = express.Router();

// Định nghĩa các route cho Coupon
router.post('/create', createCoupon); // Tạo Coupon mới
router.get('/get', getCoupons); // Lấy danh sách Coupon
router.get('/get/:id', getCouponById); // Lấy Coupon theo ID
router.put('/update/:id', updateCoupon); // Cập nhật Coupon
router.delete('/delete/:id', deleteCoupon); // Xóa Coupon

export default router;