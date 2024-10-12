import  "dotenv/config";
import fs from "fs";
import path from "path";
import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { fileURLToPath } from 'url';
import productRoutes from "./routes/productRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
connectDB();


const uploadDir = path.join(__dirname, "public/avatars");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
//rutas
app.use(userRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(pedidoRoutes);

app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
