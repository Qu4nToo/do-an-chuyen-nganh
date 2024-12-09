import express, { Application, NextFunction } from 'express';
import { Request, Response } from 'express';
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
import routerCoupon from './router/coupon.router';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import order from './router/order';
// import order from './router/order'

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/order', order);

// Catch 404 and forward to error handler
// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  // Tạo một lỗi mới với thông báo 'Not Found'
  const err: Error & { status?: number } = new Error('Not Found');
  err.status = 404; // Gán status cho lỗi
  next(err); // Chuyển lỗi sang middleware xử lý lỗi
});

// Error handler
app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  // Đặt các giá trị cục bộ (locals), chỉ hiển thị lỗi khi môi trường là 'development'
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render trang lỗi
  res.status(err.status || 500);
  res.render('error');
});

// app.use('/order', order);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
});