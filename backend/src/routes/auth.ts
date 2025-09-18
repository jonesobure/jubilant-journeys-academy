import { Router } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../env.js';


const r = Router();


r.post('/bootstrap', async (_req, res) => {
const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
if (admin) return res.status(400).json({ error: 'Admin exists' });
const passwordHash = await bcrypt.hash('admin123', 10);
const user = await prisma.user.create({ data: { name: 'Admin', email: 'admin@jja.local', passwordHash, role: 'ADMIN' } });
res.json({ id: user.id, email: user.email });
});


const loginSchema = z.object({ login: z.string().min(3), password: z.string().min(6) });
r.post('/login', async (req, res) => {
const parsed = loginSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const { login, password } = parsed.data;
const user = await prisma.user.findFirst({ where: { OR: [{ email: login }, { phone: login }] } });
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const token = jwt.sign({ role: user.role }, env.JWT_SECRET, { subject: user.id, expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});


export default r;
