import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Ticket, Users } from 'lucide-react'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <Home />
    },
    {
        key: 'User',
        label: 'User',
        path: '/admin/user',
        icon: <Users />
    },
    {
        key: 'Category',
        label: 'Category',
        path: '/admin/category',
        icon: <Package />
    },
    {
        key: 'Products',
        label: 'Products',
        path: '/admin/products',
        icon: <Package />
    },
    {
        key: 'Orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <ShoppingCart />
    },
    {
        key: 'Coupon',
        label: 'Coupon',
        path: '/admin/coupon',
        icon: <Ticket />
    }

]
