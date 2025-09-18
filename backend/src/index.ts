import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './env.js';


import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import classRoutes from './routes/classes.js';
import studentRoutes from './routes/students.js';
import invoiceRoutes from './routes/invoices.js';
import paymentRoutes from './routes/payments.js';
import reportRoutes from './routes/reports.js';
import smsRoutes from './routes/sms.js';


const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));


app.get('/api/health', (_req, res) => res.json({ ok: true }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/sms', smsRoutes);


app.use((err: any, _req: any, res: any, _next: any) => {
console.error(err);
res.status(500).json({ error: 'Internal error' });
});


app.listen(env.PORT, () => console.log(`API on :${env.PORT}`));
