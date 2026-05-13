import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";

import { PrismaClient } from "./src/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env["DATABASE_URL"],
});
export const prisma = new PrismaClient({ adapter });

const schema = new passwordValidator();
schema
  .is().min(8)                                    // Minimum length 8 
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                                // Must have uppercase letters
  .has().lowercase()                                // Must have lowercase letters
  .has().digits()                                   // Must have digits
  .has().not().spaces()                             // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']);   // Blacklist these values

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

app.get("/current-user", verifyToken, async (req, res) => {
  const userId = req.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  delete user.password;
  res.json({ user });
});

app.get("/get-secret-sauces", verifyToken, async (req, res) => {
  const userId = req.userId;
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const secretSauces = await prisma.secretSauce.findMany({
      where: { userId: user.id },
    });

    res.json({ secretSauces });
  } catch (error) {
    console.error("Error fetching secret sauces:", error);
    res.status(500).json({ error: "An error occurred while fetching secret sauces" });
  }
});

app.post("/register", async (req, res) => {

  const registerData = req.body;

  //Registered Data Validation

  
  //Missing fields Validation
  if (!registerData.email || !registerData.password || !registerData.fullName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Email already in useValidation
  const userExists = await prisma.user.findUnique({
    where: {
      email: registerData.email,
    },
  });
  if (userExists) {
    return res.status(400).json({ error: "An account with this email already exists" });
  }

  //Full name, email and password validation
  if (registerData.fullName.length < 3) {
    return res.status(400).json({ error: "Full name must be at least 3 characters long" });
  }else if (!emailValidator.validate(registerData.email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }else if (!schema.validate(registerData.password)) {
    return res.status(400).json({ error: "Password must be between 8 and 100 characters long, with atleast one uppercase letter and atleast one number" });
  }

  let user;
  try {
  const hashedPassword = bcrypt.hashSync(registerData.password, 10);

  user = await prisma.user.create({
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

res.json({ success: true, message: "User " + user.fullName + ", registered successfully!" });

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
    
    delete user.password;
    res.send({
      token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" }),
      user
    });

    
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An error occurred while logging in the user" });
  }
});

app.post("/add-secret-sauce", verifyToken, async (req, res) => {

  const userId = req.userId;
  const secretData = req.body;
  
  if (!secretData.secretContent) {
    return res.status(400).json({ error: "You must submit the secret sauce!" });
  }

  if (secretData.secretContent.length < 7) {
    return res.status(400).json({ error: "Secret sauce must be at least 7 characters long!" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const newSecretSauce = await prisma.secretSauce.create({
      data: {
        secretContent: secretData.secretContent,
        user: {
          connect: { id: userId }
        }
      }
    });

    res.json({ success: true, message: "Secret sauce added successfully!" });

  } catch (error) {
    console.error("Error adding secret sauce:", error);
    res.status(500).json({ error: "An error occurred while adding the secret sauce" });
  }

});

app.listen(port, () => {
  console.log(`Server is running   on port ${port}`);
});


