import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Import database and routes
import routerProduct from './router/product.router';
import routerUser from './router/user.router';
import routerRole from './router/role.router';
import routerCategory from './router/category.router';
import routerOrder from './router/order.router';
import routerOrderDetail from './router/orderdetail.router';
import routerCoupon from './router/coupon.router'

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/admin/product', routerProduct);
app.use('/api/admin/user', routerUser);
app.use('/api/admin/coupon', routerCoupon);
app.use('/api/admin/role', routerRole);
app.use('/api/admin/category', routerCategory);
app.use('/api/admin/order', routerOrder);
app.use('/api/admin/orderdetail', routerOrderDetail);

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    try {
      await prisma.$connect();
      console.log('Database connected');
    } catch (err) {
      console.error('Error connecting to database:', err);
    }
});