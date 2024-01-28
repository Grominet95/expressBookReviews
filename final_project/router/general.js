const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const booksArray = Object.values(books);
  return res.json(booksArray);
});

public_users.get('/isbn/:isbn', function (req, res) {
    // Retrieve the ISBN from the request parameters
    const isbn = req.params.isbn;
  
    // Find the book with the given ISBN
    const bookFound = books[isbn];
  
    // Check if the book was found and respond accordingly
    if (bookFound) {
      res.json(bookFound);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
    
public_users.get('/author/:author', function (req, res) {
    // Extract the author's name from the request parameters
    const authorName = req.params.author;
  
    // Iterate through the books to find all books by the specified author
    const booksByAuthor = [];
    for (let id in books) {
      if (books[id].author === authorName) {
        booksByAuthor.push(books[id]);
      }
    }
  
    // Check if any books were found and respond accordingly
    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
    } else {
      res.status(404).json({ message: "No books found by this author" });
    }
  });


  public_users.post("/register", (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if the username already exists
    const userExists = users[username];
    if (userExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
    // Register the new user
    // Note: In a real application, you should hash the password before storing it
    users[username] = { password };
  
    // Respond with a success message
    res.status(201).json({ message: "User registered successfully" });
  });  


  
public_users.get('/title/:title', function (req, res) {
    // Extract the title from the request parameters
    const title = req.params.title;
  
    // Iterate through the books to find all books with the specified title
    const booksByTitle = [];
    for (let id in books) {
      if (books[id].title === title) {
        booksByTitle.push(books[id]);
      }
    }
  
    // Check if any books were found and respond accordingly
    if (booksByTitle.length > 0) {
      res.json(booksByTitle);
    } else {
      res.status(404).json({ message: "No books found with this title" });
    }
  });
  

  public_users.get('/review/:isbn', function (req, res) {
    // Retrieve the ISBN from the request parameters
    const isbn = req.params.isbn;
  
    // Find the book with the given ISBN
    const bookFound = books[isbn];
  
    // Check if the book was found and if it has reviews
    if (bookFound) {
      // Check if there are reviews for the book
      if (Object.keys(bookFound.reviews).length > 0) {
        res.json(bookFound.reviews);
      } else {
        res.status(404).json({ message: "No reviews found for this book" });
      }
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
  
  public_users.get('/books', async (req, res) => {
    try {
      // Define the URL of the endpoint to get the list of books
      const url = 'https://b00813372-7000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/';
  
      // Make a GET request to the URL
      const response = await axios.get(url);
  
      // Check if the request was successful (status code 200)
      if (response.status === 200) {
        const books = response.data; // List of books
        res.json(books);
      } else {
        res.status(500).json({ message: "Failed to retrieve the list of books." });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching books." });
    }
  });
  
  // Task 2: Add the code for getting the book details based on ISBN
  public_users.get('/isbn/:isbn', function (req, res) {
    // Retrieve the ISBN from the request parameters
    const isbn = req.params.isbn;
  
    // Find the book with the given ISBN
    const bookFound = books[isbn];
  
    // Check if the book was found and respond accordingly
    if (bookFound) {
      res.json(bookFound);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
  
  // Task 3: Add the code for getting the book details based on Author
  public_users.get('/author/:author', function (req, res) {
    // Extract the author's name from the request parameters
    const authorName = req.params.author;
  
    // Iterate through the books to find all books by the specified author
    const booksByAuthor = [];
    for (let id in books) {
      if (books[id].author === authorName) {
        booksByAuthor.push(books[id]);
      }
    }
  
    // Check if any books were found and respond accordingly
    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
    } else {
      res.status(404).json({ message: "No books found by this author" });
    }
  });
  
  // Task 4: Add the code for getting the book details based on Title
  public_users.get('/title/:title', function (req, res) {
    // Extract the title from the request parameters
    const title = req.params.title;
  
    // Iterate through the books to find all books with the specified title
    const booksByTitle = [];
    for (let id in books) {
      if (books[id].title === title) {
        booksByTitle.push(books[id]);
      }
    }
  
    // Check if any books were found and respond accordingly
    if (booksByTitle.length > 0) {
      res.json(booksByTitle);
    } else {
      res.status(404).json({ message: "No books found with this title" });
    }
  });

module.exports.general = public_users;
