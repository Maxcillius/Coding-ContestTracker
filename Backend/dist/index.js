"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./routes/route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://expense-tracker-alpha-coral.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'User-Agent', 'DNT', 'Cache-Control', 'X-Mx-ReqToken', 'Keep-Alive', 'X-Requested-With',
        'If-Modified-Since', 'Cookie', 'Set-Cookie'],
    exposedHeaders: ['Content-Length', 'Content-Range']
}));
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
app.use('/api/v1', route_1.default);
app.listen(port);
console.log('Backend running on port:', port);
exports.default = route_1.default;
