import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import 'dotenv/config';
import jwt from "jsonwebtoken";


import { PrismaClient } from "./src/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env["DATABASE_URL"],
});
export const prisma = new PrismaClient({ adapter });

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

app.get("/secret-sauce", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true },
    });
    const secretSauce = `The secret sauce is: ${user.fullName}'s special recipe!`;

    res.json({ secretSauce });

  } catch (error) {
    console.error("Error fetching secret sauce:", error);
    res.status(500).json({ error: "An error occurred while fetching the secret sauce" });
  }

});

app.post("/register", async (req, res) => {

  const registerData = req.body;

  if (!registerData.email || !registerData.password || !registerData.fullName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
  const hashedPassword = bcrypt.hashSync(registerData.password, 10);

  const user = await prisma.user.create({
    data: {
      email: registerData.email,
      password: hashedPassword,
      fullName: registerData.fullName,
    },
  });

} catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering the user" });
    return;
}

res.json({ success: true, message: "User registered successfully!" });

});

app.post("/login", async (req, res) => {
  const loginData = req.body;

  if (!loginData.email || !loginData.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "No account found with this email" });
    }

    const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    res.send({
      token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" }),
      user
    });

    
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An error occurred while logging in the user" });
  }
});


app.listen(port, () => {
  console.log(`Server is running   on port ${port}`);
});

