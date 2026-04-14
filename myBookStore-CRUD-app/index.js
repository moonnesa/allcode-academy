import 'dotenv/config';
import express from 'express';

const app = express();
const port = 3000;

import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

app.use(express.json());

app.get('/get-books', async (req, res) => {
  const books = await prisma.book.findMany({
    include: {
      reviews: true
    }
  });
  res.send(books);
});

app.get('/get-book/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await prisma.book.findUnique({
    where: { id },  
    include: {  
      reviews: true
    }
  });
  res.send(book);
});


app.post('/add-book', async (req, res) => {  
  const bookData = req.body;

  if(
    !bookData.title || 
    !bookData.author || 
    !bookData.description || 
    !bookData.publishedAt
  ) {
    res.send({ error: 'Missing required fields' });
    return;
  }

  const book = await prisma.book.create({
    data: {
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      publishedAt: new Date(bookData.publishedAt)
    }
  });

  res.send({ success: "Book added successfully", book });

});

app.patch('/update-book/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;

  if(
    !updateData.title || 
    !updateData.author || 
    !updateData.description || 
    !updateData.publishedAt
  ) {
    res.send({ error: 'Missing required fields' });
    return;
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ message: `Bok med id ${id} finnes ikke` });
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: updateData.title,
        author: updateData.author,
        description: updateData.description,
        publishedAt: new Date(updateData.publishedAt)
      }
    });

    res.json({ message: `Bok med id ${id} ble oppdatert`, book: updatedBook });

  } catch (error) {
    res.status(500).json({ message: 'Noe gikk galt', error: error.message });
  }
});

app.delete('/delete-book/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Sjekk om boken finnes først
    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ message: `Bok med id ${id} finnes ikke` });
    }

    // Slett boken
    await prisma.book.delete({
      where: { id }
    });

    res.json({ message: `Bok med id ${id} ble slettet` });

  } catch (error) {
    res.status(500).json({ message: 'Noe gikk galt', error: error.message });
  }
});

app.delete('/reset-database', async (req, res) => {
  try {
    await prisma.review.deleteMany();
    await prisma.book.deleteMany();
    res.json({ message: 'Database reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Noe gikk galt', error: error.message });
  }
});

app.post('/add-review/book/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  const reviewData = req.body;

  if(!reviewData.name || !reviewData.comment ) {
    res.send({ error: 'Missing required fields' });
    return;
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return res.status(404).json({ message: `Bok med id ${bookId} finnes ikke` });
    }

    const review = await prisma.review.create({
      data: {
        name: reviewData.name,
        comment: reviewData.comment,
        book: { connect: { id: bookId } }
      }
    });
    res.json({ message: `Anmeldelse for bok med id ${bookId} ble lagt til`, review });
  } catch (error) {
    res.status(500).json({ message: 'Noe gikk galt', error: error.message });
  }
});

app.patch('/update-review/:id', async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const updateData = req.body;

    if(!updateData.name || !updateData.comment ) {  
      return res.send({ error: 'Missing required fields' });
  }
  
  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    });

    if (!review) {
      return res.status(404).json({ message: `Anmeldelse med id ${reviewId} finnes ikke` });
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        name: updateData.name,
        comment: updateData.comment
      } 
    });

    res.send({ message: `Review with id ${reviewId} updated successfully`, updatedReview });
  
  } catch (error) {
    res.status(500).json({ message: 'Noe gikk galt', error: error.message });
  }
});

app.get('/get-review/:id', async (req, res) => {
  const reviewId = parseInt(req.params.id);

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    });

    if (!review) {
      return res.status(404).json({ message: `Anmeldelse med id ${reviewId} finnes ikke` });
    }

    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: 'Noe gikk galt', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
