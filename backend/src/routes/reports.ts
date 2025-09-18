import { Router } from 'express';
import { prisma } from '../prisma.js';
import { z } from 'zod';
import { auth } from '../middleware/auth.js';


const r = Router();


r.get('/balances', auth(['ADMIN','SECRETARY','TEACHER']), async (req, res) => {
const { classId } = req.query as any;
const students = await prisma.student.findMany({ where: classId ? { classId: String(classId) } : {}, select: { id: true, firstName: true, lastName: true, classId: true } });
const ids = students.map(s => s.id);
const [invoiceAgg, paymentAgg, adjAgg] = await Promise.all([
prisma.invoice.groupBy({ by: ['studentId'], _sum: { total: true }, where: { studentId: { in: ids } } }),
prisma.payment.groupBy({ by: ['studentId'], _sum: { amount: true }, where: { studentId: { in: ids }, status: 'SUCCESS' } }),
prisma.feeAdjustment.groupBy({ by: ['studentId'], _sum: { amount: true }, where: { studentId: { in: ids } } }),
]);
const invMap = new Map(invoiceAgg.map(i => [i.studentId, Number(i._sum.total || 0)]));
const payMap = new Map(paymentAgg.map(p => [p.studentId, Number(p._sum.amount || 0)]));
const adjMap = new Map(adjAgg.map(a => [a.studentId, Number(a._sum.amount || 0)]));
const rows = students.map(s => {
const invoiced = invMap.get(s.id) ?? 0;
const paid = payMap.get(s.id) ?? 0;
const adjustments = adjMap.get(s.id) ?? 0;
const balance = invoiced - paid - adjustments;
return { studentId: s.id, name: `${s.firstName} ${s.lastName}`, classId: s.classId, invoiced, paid, adjustments, balance };
});
res.json(rows);
});


r.get('/payments', auth(['ADMIN','SECRETARY']), async (req, res) => {
const schema = z.object({ granularity: z.enum(['day','week','month','term','ytd']), classId: z.string().optional(), from: z.string().datetime().optional(), to: z.string().datetime().optional() });
const p = schema.safeParse(req.query);
if (!p.success) return res.status(400).json(p.error.flatten());
const { granularity, classId, from, to } = p.data as any;
const where: any = { status: 'SUCCESS' };
if (from || to) where.paidAt = { gte: from ? new Date(from) : undefined, lte: to ? new Date(to) : undefined };
if (classId) where.student = { classId };
const payments = await prisma.payment.findMany({ where, include: { student: { select: { classId: true } } } });
const bucket = (d: Date) => {
const dt = new Date(d);
if (granularity === 'day') return dt.toISOString().slice(0,10);
if (granularity === 'week') { const t = new Date(dt); const day = (t.getUTCDay()+6)%7; t.setUTCDate(t.getUTCDate()-day); return t.toISOString().slice(0,10); }
if (granularity === 'month') return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth()+1).padStart(2,'0')}`;
return 'ALL';
};
const map = new Map<string, number>();
for (const pmt of payments) { const k = bucket(pmt.paidAt); map.set(k, (map.get(k) ?? 0) + Number(pmt.amount)); }
res.json(Array.from(map.entries()).map(([period, amount]) => ({ period, amount })));
});


export default r;
