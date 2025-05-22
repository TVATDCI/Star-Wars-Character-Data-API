# Star Wars Character Database CRUD API

![GitHub Forks](https://img.shields.io/github/forks/TVATDCI/Star-Wars-Character-Data-API?style=for-the-badge)
![GitHub Issues](https://img.shields.io/github/issues/TVATDCI/Star-Wars-Character-Data-API?style=for-the-badge)
![GitHub Last Commit](https://img.shields.io/github/last-commit/TVATDCI/Star-Wars-Character-Data-API?style=for-the-badge)
[![GitHub Stars](https://img.shields.io/github/stars/TVATDCI/Star-Wars-Character-Data-API?style=for-the-badge)](https://github.com/TVATDCI/Star-Wars-Character-Data-API/stargazers)

<img src="/frontend/src/assets/star-wars-gold.svg" alt="Algorithm Challenge" width="200" align="right" style="margin-left: 10px;" />

"This Star Wars-themed API project is a full-stack backend exercise crafted to reinforce key skills in RESTful API development. Using Express.js and MongoDB with Mongoose, it allows developers to practice creating and testing CRUD operations, implementing validation, error handling, and working with dynamic routes. It's an engaging, hands-on way to apply theoretical knowledge in a themed and memorable context."

<img src="https://visitor-badge.laobi.icu/badge?page_id=TVATDCI.Star-Wars-Character-Data-API&title=Visitors" alt="Visitors"/>

![Custom Label](https://img.shields.io/github/stars/TVATDCI/Star-Wars-Character-Data-API?label=⭐%20Give%20a%20Star!&color=yellow)

---

[![🔱May the Fork Be With You](https://img.shields.io/badge/🔱%20May%20the%20Fork%20Be%20With%20You-Fork%20this%20repo!-blue?style=for-the-badge)](https://github.com/TVATDCI/Star-Wars-Character-Data-API/fork)

## Table of Contents

- [Star Wars Character Database CRUD API](#star-wars-character-database-crud-api)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Project Structure](#project-structure)
  - [Async/Await vs .then/.catch](#asyncawait-vs-thencatch)
    - [Async/Await](#asyncawait)
    - [Key Differences](#key-differences)
  - [Logout Functionality Recap](#logout-functionality-recap)
    - [Extra recap](#extra-recap)
    - [JWT in Header vs HTTP-Only Cookie Authentication](#jwt-in-header-vs-http-only-cookie-authentication)
      - [1. JWT in Authorization Header (Current Approach)](#1-jwt-in-authorization-header-current-approach)
      - [2. JWT in HTTP-Only Cookies (More Secure)](#2-jwt-in-http-only-cookies-more-secure)
  - [Developer Notes – Creating Admin Users](#developer-notes--creating-admin-users)
    - [Creating an Admin User via Postman (Development Only)](#creating-an-admin-user-via-postman-development-only)
    - [Frontend Behavior](#frontend-behavior)

## Project Overview

Create a REST API that manages a database of Star Wars characters. Users should be able to create, read, update, and delete character information through various endpoints.

---

## Project Structure

```bash
project-root/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controller/
│ │ └── characterController.js
│ ├── libs/
│ │ ├── seeds.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── requireAdmin.js
│ ├── models/
│ │ └── characterModel.js
│ │ └── userModel.js
│ ├── routes/
│ │ └── characterRoutes.js
│ │ └── publicRoutes.js
│ ├── app.js
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Characters.jsx
│ │ │ ├── CharacterDetail.jsx
│ │ │ └── CharacterForm.jsx
│ │ │ ├── form/
│ │ │ ├── ArrayInput.jsx
│ │ │ ├── CheckboxInput.jsx
│ │ │ └── NumberInput.jsx
│ │ │ └── TextInput.jsx
│ │ │ ├── reg-auth/
│ │ │ ├── LoginForm.jsx
│ │ │ ├── RegisterForm.jsx
│ │ │ ├── space/
│ │ │ ├── ArrayInput.jsx
│ │ │ ├── CheckboxInput.jsx
│ │ ├── App.jsx
│ │ └── App.css
│ │ ├── index.css
│ ├── main.jsx
│ └── package-lock.json
│ └── package.json
│ └── postcss.config.js
│ └── tailwind.config.js
├── .gitignore
├── README.md
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

- In this single-page application (SPA) setup controlled by setView, there's no functional need to create a separate LogoutForm.jsx
- Unless you're trying to keep your code modular or plan to reuse the logout UI. So, No, LogoutForm.jsx

**Frontend Logout**:

- The `handleLogout` function in `App.jsx` removes the token from `localStorage` and resets the `user` state.

**Example:**

```javascript
const handleLogout = () => {
  console.log("Logging out...");
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole"); // Remove userRole as well
  console.log("Token, userEmail and userRole removed from localStorage");
  setView("info");
};

<button className="style of your choice" onClick={handleLogout}>
  Logout
</button>;
```

**Backend `/logout`**:

- Currently, there is no `/logout` route in the backend. This is fine for a stateless JWT-based authentication system.
- If needed, a `/logout` route could simply return a success message:

  ```javascript
  app.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });
  ```

---

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

1. **Optional Backend `/logout`**:

   - If you want to add a `/logout` route, it could simply return a success message. For example:
     ```javascript
     app.post("/logout", (req, res) => {
       res.json({ message: "Logged out successfully" });
     });
     ```
   - However, this is not strictly necessary unless you want to implement token invalidation.

2. **Protected Routes**:

   - Bearer token logic to protect routes like `/api/characters`. This ensures only authenticated users can access certain endpoints.
   - Implement Bearer token logic in the backend to protect routes.
   - Update the frontend to include the token in the `Authorization` header for authenticated requests.

3. **Recap of Current Flow**:
   - **Register**: User registers via `/register` and gets added to the database.
   - **Login**: User logs in via `/login`, receives a JWT token, and stores it in localStorage
   - **Logout**: User clicks the "Logout" button, which removes the token from localStorage and resets the app state.

---

### Extra recap

### JWT in Header vs HTTP-Only Cookie Authentication

When building authentication systems, you can store the JWT token in two main ways: **HTTP-only cookies** or in the **Authorization header (Bearer token)**.

#### 1. JWT in Authorization Header (Current Approach)

- **Storage**: The token is saved in `localStorage` or `sessionStorage`.
- **How It Works**: Sent via the `Authorization` header with every request.
- **Example**:

  ```javascript
  fetch("http://localhost:5000/api/characters", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  ```

- Pros:
  - Easy to implement.
  - Works well for APIs and SPA setups like React apps.
- Cons:
  - Vulnerable to XSS attacks if your site is not secure.
  - Developers must manually include the token in each request.

#### 2. JWT in HTTP-Only Cookies (More Secure)

- **Storage:** Stored in a cookie with HttpOnly and Secure flags.
- **How It Works:** Automatically sent by the browser with every request to your backend (no manual Authorization header needed).

**Set by Backend:**

```javascript
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 3600000, // 1 hour
});
```

**Pros:**

- Immune to XSS (JavaScript cannot access the cookie).
- Safer for storing sensitive tokens.

**Cons:**

- Slightly more complex to implement.
- CSRF protection needs to be considered.

---

## Developer Notes – Creating Admin Users

In production, all users are registered with the default "user" role.
Admin accounts should never be exposed via the frontend form.

#### Creating an Admin User via Postman (Development Only)

**To register an admin user during development:**

- 1.Open Postman or similar API tool.
- 2.Send a POST request to:

```bash
http://localhost:5000/register
```

- 3.Use the following request body:\*\*

```bash
{
  "email": "admin@example.com",
  "password": "yourSecurePassword",
  "role": "admin"
}
```

- 4.If successful, the response should look like:

```bash
{
  "message": "User registered successfully"
}
```

This method allows you to test requireAdmin middleware and admin-only routes securely in development.

### Frontend Behavior

**RegisterForm.jsx does not expose the ability to set the user role.**

- All users registering through the frontend will always be assigned the "user" role by default, as enforced by the backend.

**⚠️ Giving clients access to register as admin in production would be like handing out lightsabers or Death Star control panels to Jawas — don't!**

$$
{\color{red}Made \space \color{red} With \space \color{red}❤️ \space \color{gold}and \space \color{lightgreen}Headache }
$$

```

```
