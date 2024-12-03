import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from 'lucide-react'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <Home />
    },
    {
        key: 'Category',
        label: 'Category',
        path: '/admin/Category',
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
        key: 'Transactions',
        label: 'Transactions',
        path: '/admin/transactions',
        icon: <LineChart />
    },
    {
        key: 'Messengers',
        label: 'Messengers',
        path: '/admin/messengers',
        icon: <Bell />
    }
]
