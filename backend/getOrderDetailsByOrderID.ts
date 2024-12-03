// getOrderDetailsByOrderID.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Lấy các OrderDetail của một Order dựa trên orderID
 * @param orderID - ID của order
 * @returns Danh sách các OrderDetail liên quan đến order
 */
async function getOrderDetailsByOrderID(orderID: string) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderID, // Tìm order dựa trên orderID
      },
      include: {
        orderDetails: true, // Bao gồm OrderDetails liên quan đến Order
      },
    });

    if (!order) {
      console.log(`Order with ID ${orderID} not found`);
      return [];
    }

    return order.orderDetails; // Trả về danh sách OrderDetail
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw new Error("Unable to fetch order details.");
  }
}

export default getOrderDetailsByOrderID;
