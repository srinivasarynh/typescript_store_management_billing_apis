import dotenv from "dotenv";
dotenv.config();

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "DATABASE_PASSWORD",
    DATABASE: process.env.DATABASE || "DATABASE",
    BASE_URL: process.env.BASE_URL || "http://localhost:8000/"
};

export default config;