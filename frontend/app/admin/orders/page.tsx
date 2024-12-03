"use client"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Admin from "../page"
import { useEffect, useState } from "react"
import axios from "axios"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import getOrderDetailsByOrderID from '../../../../backend/getOrderDetailsByOrderID';
import { any } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from 'next/compat/router';
export default function Orders() {
    const router = useRouter();
    const getStatusColor = (status: any) => {
        switch (status) {
            case "Processing":
                return "bg-yellow-500 text-white"; // Màu vàng
            case "Cancelled":
                return "bg-red-500 text-white"; // Màu đỏ
            case "Completed":
                return "bg-green-500 text-white"; // Màu xanh
            default:
                return "bg-gray-500 text-white"; // Màu xám cho trạng thái không xác định
        }
    };
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderDetailFilter, setOrderDetailFilter] = useState<any>([]);
    const [showView, setShowView] = useState(false);
    const [order, setOrder] = useState<any>([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/order/get")
            .then(orders => setOrders(orders.data))
            .catch(err => console.log(err))
        axios.get("http://localhost:5000/api/admin/orderDetail/get")
            .then(orderDetail => setOrderDetail(orderDetail.data))
            .catch(err => console.log(err))
    }, []);
    const formatPrice = (price: number): string => {
        // Kiểm tra giá trị đầu vào
        if (isNaN(price)) {
            throw new Error("Giá trị không hợp lệ");
        }

        // Định dạng giá sử dụng Intl.NumberFormat
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0, // Không có phần thập phân
        });

        // Loại bỏ ký hiệu "₫" mặc định
        return formatter.format(price).replace('₫', 'VND').trim();
    };
    
    const navigateToTargetPage = () => {
        if (!router) return;
        handleViewClick;
        // router.push({
        //     pathname: './orders/orderdetail/',
        //     query: { orderID: order.id, orderDetail: orderDetailFilter },
        // });
        router.push('/orderdetail');
    };
    function handleViewClick(order: any) {
        setOrder(order);
        console.log(orderDetail);

        // Lọc dữ liệu
        const filteredOrderDetail = orderDetail.filter((detail: any) => detail.orderID === order.id);
        console.log("Filtered Order Detail", filteredOrderDetail);

        // Cập nhật state
        setOrderDetailFilter(filteredOrderDetail);

        // Lưu dữ liệu vào localStorage
        const handleSaveData = () => {
            localStorage.setItem('orderData', JSON.stringify(order)); // Lưu order
            localStorage.setItem('orderDetailData', JSON.stringify(filteredOrderDetail)); // Lưu orderDetail
        };

        // Gọi hàm lưu dữ liệu
        handleSaveData();

        // Hiển thị dialog hoặc modal
        setShowView(true);
    }

    // Hàm đóng dialog hoặc modal
    const handleViewClose = () => {
        setShowView(false);
    };
    return (
        <Admin>
            <button onClick={navigateToTargetPage}>Go to Order Detail</button>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden md:table-cell">Phone</TableHead>
                                <TableHead className="hidden md:table-cell">Address</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order: any) => (
                                <TableRow key={order.id} className="bg-white">
                                    <TableCell>
                                        <div className="font-medium">{order.user.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {order.user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{order.phone}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{order.address}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className={`text-xs ${getStatusColor(order.status)}`} variant="outline">
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{order.orderDate}</TableCell>
                                    <TableCell className="">{formatPrice(order.totalAmount)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                // onClick={() => handleToggleMenuClick(product)}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigateToTargetPage()}>View</DropdownMenuItem>
                                                <DropdownMenuItem >Edit</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Admin>
    )
}

