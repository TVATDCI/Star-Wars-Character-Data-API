# Star Wars Character Database CRUD API

<img src="./frontend/public/alienA.jpg" alt="Algorithm Challenge" width="55" align="right" style="margin-left: 10px;" />

This project is a Star Wars-themed CRUD API exercise designed to help developers practice building RESTful endpoints and working with MongoDB/Mongoose.

## Table of Contents

- [Star Wars Character Database CRUD API](#star-wars-character-database-crud-api)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Project Structure](#project-structure)
  - [Requirements](#requirements)
    - [Database Structure](#database-structure)
    - [Required Endpoints](#required-endpoints)
    - [Additional Features to Implement](#additional-features-to-implement)
    - [Bonus Challenges](#bonus-challenges)
  - [Testing Requirements](#testing-requirements)
  - [Example Character Data](#example-character-data)
  - [Expected API Responses](#expected-api-responses)
  - [Project Guidelines](#project-guidelines)
  - [editable version in the branch characters-form is now merged.](#editable-version-in-the-branch-characters-form-is-now-merged)
  - [register-login-token-saved-logout-token-removed is tested](#register-login-token-saved-logout-token-removed-is-tested)
    - [It is in auth-routes version](#it-is-in-auth-routes-version)
    - [Updated Project Structure](#updated-project-structure)
    - [Additional Implementation](#additional-implementation)
      - [User Authentication](#user-authentication)
      - [Updated `app.js`](#updated-appjs)
    - [Summary](#summary)

## Project Overview

Create a REST API that manages a database of Star Wars characters. Users should be able to create, read, update, and delete character information through various endpoints.

## Project Structure

```bash
project-root/
├── backend/
│   ├── controllers/
│   │   └── characterController.js
│   ├── models/
│   │   └── characterModel.js
|   │   └── userModel.js
│   ├── routes/
│   │   └── characterRoutes.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   ├── libs/
│   │   ├── seeds.js
│   │   └── data.js
│   ├── node_modules/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Characters.jsx
│   │   │   ├── CharacterDetail.jsx
│   │   │   └── CharacterForm.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   ├── public/
│   ├── node_modules/
│   └── package.json
├── README.md
├── .gitignore
└── .env
```

## Requirements

### Database Structure

Create a `Character` model with the following fields:

- **name** (String, required)
- **species** (String, required)
- **homeworld** (String, required)
- **affiliation** (String, required) - (e.g., "Rebel Alliance", "Galactic Empire")
- **stats**:
  - forceRating (Number, 0-100)
  - combatSkill (Number, 0-100)
  - pilotingAbility (Number, 0-100)
  - diplomacyRating (Number, 0-100)
- **weapons** (Array of Strings)
- **vehicles** (Array of Strings)
- **isJedi** (Boolean)
- **apprentices** (Array of Strings)
- **master** (String)
- **notableAchievements** (Array of Strings)
- **createdAt** (Date, auto-generated)
- **updatedAt** (Date, auto-generated)

### Required Endpoints

**Base URL:** `/api/characters`

- `GET /` - Get all characters
- `GET /:id` - Get a single character by ID
- `GET /species/:species` - Get characters by species
- `GET /affiliation/:affiliation` - Get characters by affiliation
- `POST /` - Create a new character
- `PUT /:id` - Update a character by ID
- `DELETE /:id` - Delete a character by ID
- `GET /force-above/:threshold` - Get characters with force rating above a certain threshold
- `GET /jedi` - Get all Jedi characters

### Additional Features to Implement

- Input validation for all fields
- Error handling for invalid requests
- Proper HTTP status codes for responses
- Query parameters for filtering results
- Sorting capabilities for list endpoints
- Pagination for list endpoints

### Bonus Challenges

- Add search functionality by character name
- Implement field selection (allow clients to specify which fields to return)
- Add authentication middleware
- Create endpoints for batch operations
- Add rate limiting
- Implement request logging

## Testing Requirements

- Test all endpoints using Postman or similar tool
- Create at least 10 different character entries
- Test all CRUD operations
- Verify error handling
- Test pagination and filtering

## Example Character Data

```json
{
  "name": "Luke Skywalker",
  "species": "Human",
  "homeworld": "Tatooine",
  "affiliation": "Rebel Alliance",
  "stats": {
    "forceRating": 95,
    "combatSkill": 88,
    "pilotingAbility": 92,
    "diplomacyRating": 75
  },
  "weapons": ["Lightsaber", "Blaster"],
  "vehicles": ["X-wing Starfighter", "Snowspeeder"],
  "isJedi": true,
  "apprentices": ["Ben Solo", "Grogu"],
  "master": "Obi-Wan Kenobi",
  "notableAchievements": [
    "Destroyed the First Death Star",
    "Redeemed Darth Vader"
  ]
}
```

## Expected API Responses

- Successful requests should return appropriate data and 2xx status codes
- Failed requests should return error messages and appropriate 4xx/5xx status codes
- List endpoints should support pagination with `limit` and `skip` parameters
- Responses should include total count for paginated results

## Project Guidelines

- Set up proper folder structure (routes, controllers, models)
- Use environment variables for configuration
- Implement proper error handling middleware
- Add input validation
- Include appropriate comments
- Follow RESTful naming conventions

## editable version in the branch characters-form is now merged.

## register-login-token-saved-logout-token-removed is tested

### It is in auth-routes version

### Updated Project Structure

````markdown
## Project Structure

```bash
project-root/
├── backend/
│   ├── controllers/
│   │   ├── characterController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── characterModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── characterRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   ├── libs/
│   │   ├── seeds.js
│   │   └── data.js
│   ├── node_modules/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Characters.jsx
│   │   │   ├── CharacterDetail.jsx
│   │   │   ├── CharacterForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   ├── public/
│   ├── node_modules/
│   └── package.json
├──

README.md


├── .gitignore
└── .env
```
````

### Additional Implementation

#### User Authentication

- **User Registration**: Implemented a registration route to allow users to register with an email and password. The user data is stored in MongoDB.
- **User Login**: Implemented a login route to authenticate users. Upon successful login, a JWT token is generated and sent to the client.
- **Protected Routes**: Added middleware to protect character routes, ensuring only authenticated users can access them.
- **Frontend Authentication**: Added login and registration forms in the frontend. The user can log in, and their email is displayed along with a logout button.

#### Updated `app.js`

```javascript
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import characterRoutes from "./routes/characterRoutes.js";
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Register a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Use character routes with authentication
app.use("/api/characters", authenticateToken, characterRoutes);

app.get("/", (req, res) => {
  res.send("API is running...🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Summary

- **Updated Project Structure**: Reflects the new files and directories added for user authentication.
- **User Authentication**: Implemented registration, login, and protected routes.
- **Frontend Authentication**: Added login and registration forms, and displayed user email with a logout button.

This updated `README.md` should provide a clear overview of the project structure and the additional implementations for user authentication.### Summary

- **Updated Project Structure**: Reflects the new files and directories added for user authentication.
- **User Authentication**: Implemented registration, login, and protected routes.
- **Frontend Authentication**: Added login and registration forms, and displayed user email with a logout button.

Happy Coding 😊
