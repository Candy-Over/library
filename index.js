require("dotenv").config();
const express = require("express");
const app = express();
const { authorCreation, bookCreation, genreCreation, shelvesCreation }= require("./controller/storeController");
const { authorDeletion, bookDeletion, genreDeletion, shelvesDeletion } = require("./controller/deleteController");
const { authorList, bookList } = require("./controller/viewController");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Test Server
app.get("/", (req, res) => res.json({ msg: "Working well !!" }));

// =================================== View ========================================
app.get("/authors", authorList);
app.get("/books", bookList);

// ================================= Creation =========================================

app.post("/authors", authorCreation);
app.post("/books", bookCreation);
app.post("/genres", genreCreation);
app.post("/shelves", shelvesCreation);


// ======================================== Deletion ============================================
app.delete("/authors/:id", authorDeletion);
app.delete("/books/:id", bookDeletion);
app.delete("/genres/:id", genreDeletion);
app.delete("/shelves/:id", shelvesDeletion);




const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
