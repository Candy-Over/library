const prisma = require("../prismaCllient");

// Authors
const authorList = async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      include: {
        books: true,
      },
    });
    res.json(authors);
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};

// Books
const bookList = async (req, res) => {
    try {
      const books = await prisma.book.findMany({
        include: {
          author: true,
          genres: true,
        },
      });
      res.json(books);
    } catch (error) {
      res.json({ error: "Something went wrong" });
    }
  }
module.exports = {
  authorList,
  bookList
};
