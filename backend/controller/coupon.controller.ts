import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCoupon = async (req, res) => {
    try {
      const { endDate, startDate, discountValue, couponCode, orderID } = req.body;
  
      // Kiểm tra các trường bắt buộc
      if (!startDate || !endDate || !discountValue || !orderID) {
        return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
      }
  
      // Kiểm tra xem endDate phải lớn hơn startDate
      if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({ error: 'ngày kết thúc phải lớn hơn ngày bắt đầu' });
      }

      // Tạo Coupon mới
      const newCoupon = await prisma.coupon.create({
        data: {
          endDate,
          startDate,
          discountValue,
          couponCode,
          orderID,
        },
      });
  
      return res.status(200).json(newCoupon);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  // Lấy tất cả Coupons
  export const getCoupons = async (req, res) => {
    try {
      const coupons = await prisma.coupon.findMany({
        include: {
          order: true, // Bao gồm thông tin order liên quan
        },
      });
      return res.status(200).json(coupons);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Lấy Coupon theo ID
  export const getCouponById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const coupon = await prisma.coupon.findUnique({
        where: { id },
        include: {
          order: true,
        },
      });
  
      if (!coupon) {
        return res.status(404).json({ error: 'không tìm thấy Coupon' });
      }
  
      return res.status(200).json(coupon);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Cập nhật Coupon
  export const updateCoupon = async (req, res) => {
    try {
      const { id } = req.params;
      const { endDate, startDate, discountValue, couponCode, orderID } = req.body;
      if (!startDate || !endDate || !discountValue || !couponCode || !orderID) {
        return res.status(400).json({ error: 'Thiếu trường dữ liệu' });
      }
      if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({ error: 'ngày kết thúc phải lớn hơn ngày bắt đầu' });
      }
      const updatedCoupon = await prisma.coupon.update({
        where: { id },
        data: {
          endDate,
          startDate,
          discountValue,
          couponCode,
          orderID,
        },
      });
  
      return res.status(200).json(updatedCoupon);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'không tìm thấy Coupon' });
      }
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Xóa Coupon
  export const deleteCoupon = async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.coupon.delete({
        where: { id },
      });
  
      return res.status(200).json({ message: 'xóa coupon thành công' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Không ' });
      }
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };