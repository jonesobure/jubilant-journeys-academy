import { Router } from 'express';
import { prisma } from '../prisma.js';
import { z } from 'zod';
import { auth, AuthedRequest } from '../middleware/auth.js';


const r = Router();


const createSchema = z.object({
studentId: z.string(), amount: z.number().positive(), method: z.string(),
provider: z.string().optional(), transactionRef: z.string().optional(), termId: z.string().optional(), invoiceId: z.string().optional(), dedupeKey: z.string().optional()
});


r.post('/', auth(['ADMIN','SECRETARY']), async (req: AuthedRequest, res) => {
const parsed = createSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const { studentId, amount, method, provider, transactionRef, termId, invoiceId, dedupeKey } = parsed.data;
if (dedupeKey) {
const exists = await prisma.payment.findUnique({ where: { dedupeKey } });
if (exists) return res.status(409).json({ error: 'Duplicate payment (dedupeKey)' });
}
if (provider && transactionRef) {
const exists = await prisma.payment.findUnique({ where: { provider_transactionRef_unique: { provider, transactionRef } } as any });
if (exists) return res.status(409).json({ error: 'Duplicate payment (provider+transactionRef)' });
}
const pay = await prisma.payment.create({ data: { studentId, amount, method, provider, transactionRef, termId, invoiceId, status: 'SUCCESS', source: 'MANUAL', createdById: req.user!.id } });
res.status(201).json(pay);
});


r.get('/', auth(['ADMIN','SECRETARY']), async (req, res) => {
const { studentId, from, to } = req.query as any;
const where: any = {};
if (studentId) where.studentId = String(studentId);
if (from || to) where.paidAt = { gte: from ? new Date(String(from)) : undefined, lte: to ? new Date(String(to)) : undefined };
const payments = await prisma.payment.findMany({ where, orderBy: { paidAt: 'desc' } });
res.json(payments);
});


export default r;
