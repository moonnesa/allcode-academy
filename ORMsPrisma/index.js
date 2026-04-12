import express from 'express';

import { PrismaClient } from "/Users/Mooni/Desktop/Allcode-Projects/ORMsPrisma/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });

const app = express();

app.use(express.json());

app.get('/get-posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.send(posts);
});

app.post('/create-post', async (req, res) => {
    
    const PostData = req.body;
    
    const post = await prisma.post.create({
        data: {
            title: PostData.title,
            content: PostData.content,
            creatorName: PostData.creatorName,
            likes: PostData.likes,
        }
    });
    res.send({ post: post });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});