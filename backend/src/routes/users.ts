import { Router } from 'express';
import { prisma } from '../prisma.js';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { auth, AuthedRequest } from '../middleware/auth.js';


const r = Router();


r.get('/', auth(['ADMIN']), async (_req, res) => {
const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
res.json(users);
});


const upsertSchema = z.object({
name: z.string().min(2),
email: z.string().email().optional(),
phone: z.string().optional(),
password: z.string().min(6),
role: z.enum(['ADMIN','SECRETARY','TEACHER'])
});


r.post('/', auth(['ADMIN']), async (req: AuthedRequest, res) => {
const parsed = upsertSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const { name, email, phone, password, role } = parsed.data;
const passwordHash = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { name, email, phone, passwordHash, role } });
res.status(201).json(user);
});


r.patch('/:id/role', auth(['ADMIN']), async (req, res) => {
const schema = z.object({ role: z.enum(['ADMIN','SECRETARY','TEACHER']) });
const parsed = schema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const user = await prisma.user.update({ where: { id: req.params.id }, data: { role: parsed.data.role } });
res.json(user);
});


export default r;
