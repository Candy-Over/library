const prisma = require("../prismaCllient");

// Author by id
const authorDeletion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedAuthor);
  } catch (error) {
    res.json({ error: "Failed to delete the author" });
  }
};

// Book by id
const bookDeletion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedBook);
  } catch (error) {
    res.json({ error: "Failed to delete the book" });
  }
};

// Genre by id
const genreDeletion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGenre = await prisma.genre.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedGenre);
  } catch (error) {
    res.json({ error: "Failed to delete the genre" });
  }
};

// Shelves by id
const shelvesDeletion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShelf = await prisma.shelf.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedShelf);
  } catch (error) {
    res.json({ error: "Failed to delete the shelf" });
  }
};

module.exports = {
  authorDeletion,
  bookDeletion,
  genreDeletion,
  shelvesDeletion
};
