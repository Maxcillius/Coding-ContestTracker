import express from 'express'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import router from './routes/route'

const app = express()
const port = process.env.PORT || 3000
const secret = process.env.JWT_SECRET as string

app.use(express.json())

app.use(cors({
    origin: ['https://expense-tracker-alpha-coral.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'User-Agent', 'DNT', 'Cache-Control', 'X-Mx-ReqToken', 'Keep-Alive', 'X-Requested-With',
        'If-Modified-Since', 'Cookie', 'Set-Cookie'],
    exposedHeaders: ['Content-Length', 'Content-Range']
}))

// app.use(session({
//     secret: secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // For HTTPS
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 30,
//         // sameSite: 'none'  // Important for cross-origin cookies
//     },
// }))

// app.use(cookieParser())

// declare module 'express-session' {
//     interface SessionData {
//         isLoggedIn: boolean
//         userId: string
//         email: string
//         name: string
//     }
// }

app.use('/api/v1', router)

app.listen(port)
console.log('Backend running on port:', port)

export default router