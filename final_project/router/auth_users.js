const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

regd_users.post("/login", (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Validate the username and password
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Create a JWT token
  const token = jwt.sign(
    { username: username },
    'your-secret-key', // Replace with a real secret key
    { expiresIn: '1h' } // Sets the token expiration time
  );

  // Respond with the JWT token
  res.json({ message: "Logged in successfully", token: token });
});


regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review; // Get review from query parameter
    const username = "testUser"; // Hardcoded username for testing

    const book = books[isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.reviews) {
      book.reviews = {}; // Initialize reviews if not present
    }
    book.reviews[username] = review;

    res.json({ message: "Review added/updated successfully" });
});

regd_users.put("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review; // Get review from query parameter
    const username = "testUser"; // Hardcoded username for testing

    const book = books[isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.reviews) {
      book.reviews = {}; // Initialize reviews if not present
    }
    book.reviews[username] = review;

    res.json({ message: "Review added/updated successfully" });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

