import { Router } from 'express';
import { prisma } from '../prisma.js';
import { z } from 'zod';
import { auth } from '../middleware/auth.js';


const r = Router();


r.post('/', auth(['ADMIN','SECRETARY']), async (req, res) => {
const schema = z.object({
studentId: z.string(), termId: z.string(), dueDate: z.string().datetime().optional(),
items: z.array(z.object({ category: z.enum(['TUITION','GENERAL_FUND','OTHER']), description: z.string(), amount: z.number().nonnegative() }))
});
const parsed = schema.safeParse(req.body);
if (!parsed.success) return res.status(400).json(parsed.error.flatten());
const { studentId, termId, dueDate, items } = parsed.data;
const subtotal = items.reduce((s, i) => s + i.amount, 0);
const number = `INV-${Date.now()}`;
const student = await prisma.student.findUniqueOrThrow({ where: { id: studentId } });
const invoice = await prisma.invoice.create({
data: {
studentId, termId, number, status: 'SENT', dueDate: dueDate ? new Date(dueDate) : null,
toPhone: student.guardianPhone, subtotal: subtotal, total: subtotal,
items: { create: items.map(i => ({ category: i.category, description: i.description, amount: i.amount })) }
},
include: { items: true }
});
await prisma.outboundSms.create({ data: { toPhone: student.guardianPhone, body: `Invoice ${number}: KES ${subtotal.toFixed(2)} due.` , relatedType: 'INVOICE', relatedId: invoice.id } });
res.status(201).json(invoice);
});


export default r;
