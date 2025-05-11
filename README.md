# Star Wars Character Database CRUD API

<img src="./frontend/public/alienA.jpg" alt="Algorithm Challenge" width="55" align="right" style="margin-left: 10px;" />

This project is a Star Wars-themed CRUD API exercise designed to help developers practice building RESTful endpoints and working with MongoDB/Mongoose.

## Table of Contents

- [Star Wars Character Database CRUD API](#star-wars-character-database-crud-api)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Project Structure](#project-structure)
  - [Async/Await vs .then/.catch](#asyncawait-vs-thencatch)
    - [Async/Await](#asyncawait)
    - [Key Differences](#key-differences)
  - [Logout Functionality Recap](#logout-functionality-recap)
    - [Current State](#current-state)
    - [Next Steps for development](#next-steps-for-development)
  - [Editable Version in the Branch Characters-Form is Now Merged](#editable-version-in-the-branch-characters-form-is-now-merged)
  - [Register-Login-Token-Saved-Logout-Token-Removed is Tested](#register-login-token-saved-logout-token-removed-is-tested)
    - [It is in Auth-Routes Version](#it-is-in-auth-routes-version)
    - [Now they are all merged to the main](#now-they-are-all-merged-to-the-main)
    - [**Next Steps**](#next-steps)

## Project Overview

Create a REST API that manages a database of Star Wars characters. Users should be able to create, read, update, and delete character information through various endpoints.

---

## Project Structure

```bash
project-root/
├── backend/
│ │ ├── characterController.js
│ │ └── userController.js
│ ├── models/
│ │ └── characterModel.js
│ ├── routes/
│ │ └── characterRoutes.js
│ ├── app.js
│ ├── config/
│ │ └── db.js
│ ├── middleware/
│ ├── libs/
│ │ ├── seeds.js
│ │ └── data.js
│ ├── node_modules/
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Characters.jsx
│ │ │ ├── CharacterDetail.jsx
│ │ │ └── CharacterForm.jsx
│ │ ├── App.jsx
│ │ ├── index.js
│ │ └── App.css
│ ├── public/
│ ├── node_modules/
│ └── package.json
├── README.md
├── .gitignore
└── .env
```

---

## Async/Await vs .then/.catch

### Async/Await

- **Syntax**: Cleaner and more readable, especially for complex logic.
- **Error Handling**: Use `try/catch` blocks to handle errors.
- **Sequential Execution**: Makes asynchronous code look synchronous, which is easier to follow.
- **Example**:
  \*\*Example
  ```javascript
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Token received:", data.token);
        localStorage.setItem("token", data.token);
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  ```

````

### .then/.catch

- **Syntax**: Uses chained `.then()` for success and `.catch()` for errors.
- **Error Handling**: Errors are caught in the `.catch()` block.
- **Readability**: Can become harder to read with nested `.then()` calls (callback hell).

**Example**:
```javascript
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          console.log("Token received:", data.token);
          localStorage.setItem("token", data.token);
        } else {
          console.error("Login failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };
````

### Key Differences

| Feature        | `async/await`                   | `.then/.catch`                      |
| -------------- | ------------------------------- | ----------------------------------- |
| Syntax         | Cleaner and more readable       | Can become verbose with chaining    |
| Error Handling | `try/catch` blocks              | `.catch()` method                   |
| Readability    | Easier for sequential logic     | Harder with nested `.then()` calls  |
| Use Case       | Preferred for modern JavaScript | Useful for simple, quick operations |

---

## Logout Functionality Recap

### Current State

- **Frontend Logout**:

  - The `handleLogout` function in `App.jsx` removes the token from `localStorage` and resets the `user` state.
  - Example:
    ```javascript
    const handleLogout = () => {
      console.log("Logging out...");
      setUser(null);
      localStorage.removeItem("token");
      console.log("Token removed:", localStorage.getItem("token")); // Should log `null`
      setView("info");
    };
    ```

- **Backend `/logout`**:
  - Currently, there is no `/logout` route in the backend. This is fine for a stateless JWT-based authentication system.
  - If needed, a `/logout` route could simply return a success message:
    ```javascript
    app.post("/logout", (req, res) => {
      res.json({ message: "Logged out successfully" });
    });
    ```

---

### Next Steps for development

1. **Implement Bearer Token Logic**:

   - Protect routes like `/api/characters` by requiring a valid token in the `Authorization` header.
   - Example middleware:

     ```javascript
     const authenticateToken = (req, res, next) => {
       const token = req.headers["authorization"]?.split(" ")[1];
       if (!token) return res.status(401).json({ error: "Access denied" });

       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         if (err) return res.status(403).json({ error: "Invalid token" });
         req.user = user;
         next();
       });
     };
     ```

2. **Frontend Token Usage**:

   - Include the token in the `Authorization` header for authenticated requests:
     ```javascript
     const token = localStorage.getItem("token");
     fetch("http://localhost:5000/protected-route", {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     ```

3. **Enhance Logout**:
   - Ensure the token is removed from `localStorage` and the app state is reset.

---

## Editable Version in the Branch Characters-Form is Now Merged

## Register-Login-Token-Saved-Logout-Token-Removed is Tested

### It is in Auth-Routes Version

### Now they are all merged to the main

### **Next Steps**

1. **Optional Backend `/logout`**:

   - If you want to add a `/logout` route, it could simply return a success message. For example:
     ```javascript
     app.post("/logout", (req, res) => {
       res.json({ message: "Logged out successfully" });
     });
     ```
   - However, this is not strictly necessary unless you want to implement token invalidation.

2. **Protected Routes**:

   - The next step is to implement Bearer token logic to protect routes like `/api/characters`. This ensures only authenticated users can access certain endpoints.
   - Implement Bearer token logic in the backend to protect routes.
   - Update the frontend to include the token in the `Authorization` header for authenticated requests.

3. **Recap of Current Flow**:
   - **Register**: User registers via `/register` and gets added to the database.
   - **Login**: User logs in via `/login`, receives a JWT token, and stores it in localStorage
   - **Logout**: User clicks the "Logout" button, which removes the token from localStorage and resets the app state.

---
