const prisma = require("../prismaCllient");

// Author Create
const authorCreation = async (req, res) => {
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
    res.json({ error: "Something went wrong" });
  }
};

// Book Create
const bookCreation = async (req, res) => {
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
    res.json({ error: "Something went wrong" });
  }
};


// Genre
const genreCreation = async (req, res) => {
  try {
    const { name } = req.body;

    const existingGenre = await prisma.genre.findUnique({
      where: { name },
    });

    if (existingGenre) {
      return res.json({ error: "Genre already exists" });
    }

    const newGenre = await prisma.genre.create({
      data: {
        name,
      },
    });

    res.json(newGenre);
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};

// Shelves
const shelvesCreation = async (req, res) => {
  try {
    const { name, location } = req.body;

    const existingShelf = await prisma.shelf.findFirst({
      where: { name },
    });

    if (existingShelf) {
      return res.json({ error: "Shelf already exists" });
    }

    const newShelf = await prisma.shelf.create({
      data: {
        name,
        location,
      },
    });

    res.json(newShelf);
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};


module.exports = {
  authorCreation,
  bookCreation,
  genreCreation,
  shelvesCreation,
};
