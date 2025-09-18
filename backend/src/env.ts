import 'dotenv/config';


function need(name: string) {
const v = process.env[name];
if (!v) throw new Error(`Missing env ${name}`);
return v;
}


export const env = {
NODE_ENV: process.env.NODE_ENV ?? 'development',
PORT: Number(process.env.PORT ?? 4000),
FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
DATABASE_URL: need('DATABASE_URL'),
JWT_SECRET: need('JWT_SECRET'),
SMS_SENDER_ID: process.env.SMS_SENDER_ID ?? 'JJA',
};
