# Star Wars Character Database CRUD API

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
│   ├── routes/
│   │   └── characterRoutes.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   ├── libs/
│   │   └── seeds.js
│   ├── node_modules/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
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

This exercise will help you practice MongoDB/Mongoose operations, REST API design, and backend development principles while working with a fun Star Wars theme. Good luck!
