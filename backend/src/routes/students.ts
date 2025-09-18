import { Router } from 'express';
import { prisma } from '../prisma.js';
import { z } from 'zod';
import { auth, AuthedRequest } from '../middleware/auth.js';


const r = Router();


r.get('/', auth(['ADMIN','SECRETARY']), async (req, res) => {
const { classId } = req.query as any;
const where = classId ? { classId: String(classId) } : {};
const students = await prisma.student.findMany({ where, orderBy: { admittedAt: 'desc' } });
res.json(students);
});


r.get('/me/class', auth(['TEACHER']), async (req: AuthedRequest, res) => {
const assignments = await prisma.teacherAssignment.findMany({ where: { teacherId: req.user!.id, toDate: null } });
const classIds = assignments.map(a => a.classId);
const students = await prisma.student.findMany({ where: { classId: { in: classIds } } });
res.json(students);
});


const admitSchema = z.object({
admissionNo: z.string(), firstName: z.string(), lastName: z.string(),
guardianPhone: z.string(), guardianName: z.string().optional(), classId: z.string().optional()
});


r.post('/admit', auth(['ADMIN','SECRETARY','TEACHER']), async (req: AuthedRequest, res) => {
const parsed = admitSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const data = parsed.data as any;
if (req.user!.role === 'TEACHER') {
const ta = await prisma.teacherAssignment.findFirst({ where: { teacherId: req.user!.id, toDate: null } });
if (!ta) return res.status(403).json({ error: 'No class assigned' });
data.classId = ta.classId;
}
const student = await prisma.student.create({ data });
res.status(201).json(student);
});


export default r;
