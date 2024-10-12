import "dotenv/config";
import User from "../models/User.js";
import connectDB from "../config/mongoose.js";

connectDB();

async function userSeeder() {
  await User.create({
    firstName: "Carlos",
    lastName: "Barragan",
    email: "Carlos@starwars.com",
    password: process.env.SEEDER_USER_PASSWORD,
    avatar: "1.png",
    age: 30,
  });

  console.log("[Seeder] User created!");
  process.exit(1);
}

userSeeder();
