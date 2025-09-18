import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';


type Role = 'ADMIN' | 'SECRETARY' | 'TEACHER';
export interface AuthedRequest extends Request { user?: { id: string; role: Role } }


export function auth(required?: Role[]) {
return (req: AuthedRequest, res: Response, next: NextFunction) => {
const h = req.headers.authorization;
if (!h?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
try {
const token = h.split(' ')[1];
const payload = jwt.verify(token, env.JWT_SECRET) as any;
req.user = { id: payload.sub, role: payload.role };
if (required && !required.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
next();
} catch {
return res.status(401).json({ error: 'Invalid token' });
}
};
}
