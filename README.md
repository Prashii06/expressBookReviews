# Book Review Application

## Overview
This is a server-side book review application built with Node.js and Express.js. It provides a REST API for managing books, user authentication, and book reviews. The application uses JSON Web Tokens (JWT) for session-based authentication and supports CRUD operations for book reviews. It also includes Promise-based endpoints for asynchronous data retrieval.

The project is part of a final assignment for a course by IBM Developer Skills Network, forked from [expressBookReviews](https://github.com/1bm-developer-skills-network/expressBookReviews).

## Features
- **Public Routes**:
  - Get a list of all books.
  - Get book details by ISBN, author, or title.
  - View book reviews by ISBN.
  - Register a new user.
- **Authenticated Routes**:
  - Login with username and password to obtain a JWT.
  - Add or modify a book review (authenticated users only).
  - Delete a book review (authenticated users can only delete their own reviews).
- **Asynchronous Routes**:
  - Promise-based endpoints for retrieving book data (list, ISBN, author, title).
- **Security**:
  - JWT-based session authentication for protected routes.
  - Input validation for user registration and login.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Postman (for testing API endpoints)

## Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/expressBookReviews.git
   cd expressBookReviews/final_project