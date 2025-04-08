require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json());

// Test Server
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Working well !!" });
});

// Route to get all authors
app.get("/authors", async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      include: {
        books: true,
      },
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Route to get all books
app.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        genres: true,
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Route to create a new author
app.post("/authors", async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newAuthor = await prisma.author.create({
      data: {
        name,
        bio,
      },
    });
    res.json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Route to create a new book
app.post("/books", async (req, res) => {
  try {
    const { title, authorId, genres, quantity, shelf } = req.body;
    const newBook = await prisma.book.create({
      data: {
        title,
        authorId,
        quantity,
        shelf,
        genres: {
          connect: genres.map((genreId) => ({ id: genreId })),
        },
      },
    });
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Route to create a new genre
app.post("/genres", async (req, res) => {
  try {
    const { name } = req.body;

    const existingGenre = await prisma.genre.findUnique({
      where: { name },
    });

    if (existingGenre) {
      return res.status(400).json({ error: "Genre already exists" });
    }

    const newGenre = await prisma.genre.create({
      data: {
        name,
      },
    });

    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Route to delete an author by ID
app.delete("/authors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the author" });
  }
});

// Route to delete a book by ID
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
