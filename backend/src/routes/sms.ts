import { Router } from 'express';
import { prisma } from '../prisma.js';
import { auth } from '../middleware/auth.js';


const r = Router();


r.get('/queue', auth(['ADMIN','SECRETARY']), async (_req, res) => {
const items = await prisma.outboundSms.findMany({ where: { status: 'QUEUED' }, orderBy: { createdAt: 'asc' } });
res.json(items);
});


r.post('/:id/mark-sent', auth(['ADMIN','SECRETARY']), async (req, res) => {
const sms = await prisma.outboundSms.update({ where: { id: req.params.id }, data: { status: 'SENT', sentAt: new Date() } });
res.json(sms);
});


export default r;
