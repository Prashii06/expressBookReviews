const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.status(200).json(books);
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).json(books[isbn]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
    if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 4: Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const matchingBooks = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());
    if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).json(books[isbn].reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: "Username already exists" });
    }
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

// Task 10: Get book list using Promise
public_users.get('/promise/books', function (req, res) {
    new Promise((resolve) => {
        resolve(books);
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "Error fetching books" }));
});

// Task 11: Get book details by ISBN using Promise
public_users.get('/promise/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: err }));
});

// Task 12: Get book details by author using Promise
public_users.get('/promise/author/:author', function (req, res) {
    const author = req.params.author;
    new Promise((resolve, reject) => {
        const matchingBooks = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
        if (matchingBooks.length > 0) {
            resolve(matchingBooks);
        } else {
            reject("No books found by this author");
        }
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: err }));
});

// Task 13: Get book details by title using Promise
public_users.get('/promise/title/:title', function (req, res) {
    const title = req.params.title;
    new Promise((resolve, reject) => {
        const matchingBooks = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());
        if (matchingBooks.length > 0) {
            resolve(matchingBooks);
        } else {
            reject("No books found with this title");
        }
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: err }));
});

module.exports.general = public_users;