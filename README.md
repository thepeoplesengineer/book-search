# Book Search App

This project is a full-stack MERN (MongoDB, Express, React, Node) application that allows users to search for books and save them to their profile. Users can sign up, log in, and view saved books using authentication managed by JWT. The application uses Apollo Client for interacting with a GraphQL API.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or later recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) account for database setup

## Usage
Sign up for an account via the signup form. Log in with your new account. Search for books using the search form. The app fetches data from the Google Books API. Save books to your profile by clicking "Save This Book!". View and delete saved books in the "Saved Books" section.

## Features
Authentication: Users can sign up, log in, and have a unique token stored in local storage.
Protected Routes: Only authenticated users can access saved books.
GraphQL API: All requests (queries and mutations) go through a GraphQL endpoint.
Responsive UI: Built with React Bootstrap to ensure a mobile-friendly design.

## Technologies Used
Backend: Node.js, Express, MongoDB, Apollo Server, GraphQL, Mongoose
Frontend: React, Apollo Client, React Router, React Bootstrap
Authentication: JSON Web Tokens (JWT)
Deployment: Render for deployment, MongoDB Atlas for cloud-hosted database

## Directory Structure
book-search-app/
├── client/                # Frontend code (React)
│   ├── src/
│   │   ├── components/    # Reusable components like Navbar, Forms
│   │   ├── pages/         # Page components (e.g., SearchBooks, SavedBooks)
│   │   ├── utils/         # GraphQL queries, mutations, authentication
│   │   ├── App.tsx        # Main App component with routes
│   │   ├── index.tsx      # Entry point
│   │   └── ...other files
│   └── package.json       # Frontend dependencies and scripts
└── server/                # Backend code (Node, Express, Apollo Server)
    ├── src/
    │   ├── models/        # Mongoose models
    │   ├── schemas/       # GraphQL typeDefs and resolvers
    │   ├── services/      # Authentication services
    │   ├── config/        # MongoDB connection
    │   └── index.ts       # Entry point
    └── package.json       # Backend dependencies and scripts

## Contributing
Fork the repository. Create your feature branch (git checkout -b feature/AmazingFeature). Commit your changes (git commit -m 'Add some Feature'). Push to the branch (git push origin Feature). Open a pull request.

## License
This project is licensed under the MIT License.
