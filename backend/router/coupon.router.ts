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
router.post('/coupons', createCoupon); // Tạo coupon mới
router.get('/coupons', getCoupons); // Lấy danh sách coupon
router.get('/coupons/:id', getCouponById); // Lấy coupon theo ID
router.put('/coupons/:id', updateCoupon); // Cập nhật coupon
router.delete('/coupons/:id', deleteCoupon); // Xóa coupon

export default router;