import { fileURLToPath } from "url";
import path from "path";
import { PrismaClient } from "../server/src/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "images")));

app.post("/api/upload-picture", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, "images", file.name);

  file.mv(uploadPath, async (err) => {
    if (err) {
      console.error("mv error:", err);
      return res.status(500).send(err);
    }
    try {
      const image = await prisma.image.create({
        data: { fileName: file.name, filePath: uploadPath, name: file.name },
      });
      res.send(image);
    } catch (prismaError) {
      console.error("Prisma error:", prismaError);
      res.status(500).send(prismaError.message);
    }
  });
});

app.get("/api/get-pictures", async (req, res) => {
  const pictures = await prisma.image.findMany();
  res.send({ pictures });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});