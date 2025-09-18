import { Router } from 'express';
import { prisma } from '../prisma.js';
import { z } from 'zod';
import { auth } from '../middleware/auth.js';


const r = Router();


r.get('/', auth(['ADMIN','SECRETARY','TEACHER']), async (_req, res) => {
const classes = await prisma.class.findMany({ orderBy: { level: 'asc' } });
res.json(classes);
});


r.post('/', auth(['ADMIN','SECRETARY']), async (req, res) => {
const schema = z.object({ level: z.string().min(1), stream: z.string().optional() });
const parsed = schema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const code = `${parsed.data.level}-${parsed.data.stream ?? 'MAIN'}`.toUpperCase();
const created = await prisma.class.create({ data: { ...parsed.data, code } });
res.status(201).json(created);
});


r.post('/:id/assign-teacher', auth(['ADMIN','SECRETARY']), async (req, res) => {
const schema = z.object({ teacherId: z.string() });
const parsed = schema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const ta = await prisma.teacherAssignment.create({ data: { teacherId: parsed.data.teacherId, classId: req.params.id } });
res.status(201).json(ta);
});


export default r;
