# Next is not a function - a student VS "Middleman"

**mission: debugging Middleware signatures**

## Post-Mortem: "next is not a function" in User Registration

### 1. What Happened

After refactoring the frontend to use **Axios** and updating backend dependencies, the user registration flow began failing with a `500 Internal Server Error`. While existing users could log in successfully, new registrations crashed the server with the specific error: `TypeError: next is not a function`.

### 2. What i Suspected

- **One quick catch for the refactor**
- RegisterForm.jsx, i am using custom buttons like `<BtnNeoGradient />` and `<ButtonGradient />` inside the form. If those buttons have a default type of submit, they might trigger multiple form submissions at once. Ensure only the main "Register" button is the submitter.
-
- **CHECKED** All is good.

**controllers and routes ?**

- The code for in controllers and routes actually looks solid in terms of the Express `(req, res, next)` signature. Since `loginUser` works but `registerUser` throws "next is not a function," the issue likely isn't the code itself, but how it's being **invoked** or a subtle **import/export** mismatch during the refactor.

### Breaking down what is likely happening:

#### 1. The Export/Import Ghost

In `authRoutes.js`, importing `{ registerUser, loginUser }` from `authController.js`.

- If i recently changed these from `module.exports` to ES6 `export`, ensure the development server (Nodemon) actually restarted.
- If `registerUser` is somehow undefined when it reaches `router.post`, Express might be trying to process the route incorrectly.

#### 2. Check the `registerUser` Implementation

In controller, i have:

```javascript
const registerUser = async (req, res, next) => { ... }

```

Adding debugger

```javascript
const registerUser = async (req, res, next) => {
  console.log('Register Controller Hit');
  console.log('req type:', typeof req);
  console.log('res type:', typeof res);
  console.log('next type:', typeof next); // 'undefined' or 'object'

  const { email, password, role } = req.body;
```

```text
 "MongoDB Connected: cluster0-shard-00-01.4tnop.mongodb.net

[0] --- Incoming Request: POST /api/v1/auth/register ---

[0] Body: { email: 'tnt@example.com', password: '123456' }

[0] Is next a function? true

[0] Register Controller Hit

[0] req type: object
```

logs prove that Express is working perfectly and the next function is indeed defined and valid when it hits the controller.

If the backend is still crashing with "next is not a function" after these logs appear, it means the crash isn't happening in the registerUser function itself, but rather inside the asynchronous logic or a dependency called within that function.

If i am using an older version of a library like `express-async-handler` or a custom wrapper that i didn't include here, it might be stripping the `next` argument before it reaches your function. However, looking at `authController.js`, i am calling `next(error)` manually in the `catch` block.

#### 3. Axios vs. Proxy (The 500 Error)

Switching to **Axios** and seeing a `500 (Internal Server Error)` on `http://localhost:5173/api/v1/auth/register`.

- **The Problem:** `5173` is typically **Vite/Frontend** port, not your **Express/Backend** port (which is usually 5000 or 8000).
- **The Result:** If Axios is hitting the Vite development server instead of the Backend, Vite might be trying to handle the POST request, failing, and returning a generic error that misinterprets the middleware stack.

#### Fixing

- **Verify Backend Port:** Trying ensure Axios base URL is pointing to the Backend port (e.g., `http://localhost:5000`) and not the Frontend port (`5173`).
- **Double-Check User Model:** In `authController.js`, calling `await user.save()`. If `userModel.js` has **Mongoose Middleware** (like `userSchema.pre('save', ...)`), **YES** Then check that function. If that middleware is written as `userSchema.pre('save', function(next) { ... })` and forgot to call `next()`, or called it incorrectly, it will trigger this exact error.

**In `userModel.js`?** I suspect there is a `pre-save` hook for password hashing that might be missing the `next()` call.

- **Vite Proxy Mismatch:** I initially suspected the new Axios configuration was hitting the wrong port (Vite's `5173` instead of Express's `5000`), causing a routing error.
- **Middleware Signature:** So i suspected a middleware or controller was missing the `next` argument or calling it out of order.
- **Mongoose Lifecycle:** Since Login worked (Read) but Register failed (Write), I suspected the issue lived in the `userModel.js` `pre-save` hook.

### 3. Debugging Process

To isolate the failure point, so i implemented a logging "breadcrumb" strategy:

- **Traffic Monitor:** Added global middleware to `app.js` to log incoming requests and verify if `next` was valid at the entry point.
- **Controller Logging:** Verified that `registerUser` in `authController.js` received all arguments correctly.
- **Model Instrumentation:** Added logs inside the `userSchema.pre('save', ...)` hook in `userModel.js` to check the state of the `next` callback during the password hashing process.

### The Suspect: user.save()

In registerUser controller, i call await user.save(). This triggers the pre("save") hook in userModel.js.

Even though userModel.js code looks correct, if there is a version mismatch with mongoose or bcrypt, or if bcrypt is failing silently, the way the error is passed back can sometimes corrupt the stack trace in older Node environments.

The "Deep Dive" Debug
OK. let's add logs to the Model to see if the "handshake" between the controller and the database is where the breakdown happens.

**In `userSchema.pre("save", ...)` in `userModel.js`:**

```javascript
userSchema.pre('save', async function (next) {
  console.log('--- Model: Pre-save hook started ---');
  console.log('Is next a function in Model?', typeof next === 'function');

  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hash');
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    console.log('Salt generated');
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (err) {
    console.error('Error in Model Pre-save:', err);
    next(err);
  }
});
```

In the terminal

```bash
" Server running in development mode on port 5000

[0]   🌐  http://localhost:5000

[0] 🟢 MongoDB Connected:

[0] --- Model: Pre-save hook started ---

[0] Is next a function in Model? false

[0] Salt generated

[0] Password hashed successfully

[0] Error in Model Pre-save: TypeError: next is not a function

[0]     at model.<anonymous> (file:///home/xxx/Projects/Star-Wars-Character-Data-API/backend/models/userModel.j
```

### 4. BINGO what i Found Out

The logs revealed that the `next` function was valid at the Controller level but became `false` inside the Mongoose `pre-save` hook.

- **Root Cause:** In modern Mongoose, `async` middleware functions automatically return a Promise. Mixing the `next` callback with an `async` function signature can lead to Mongoose passing an internal state object (which evaluated to `false` or `undefined`) as the first argument instead of the expected callback function.

### 5. How it is Solved

Updating `userModel.js` to follow modern ES6 `async/await` standards for Mongoose middleware:

- **Removed the `next` parameter** from the `pre('save')` function signature.
- **Removed the `next()` calls** within the logic.
- **Replaced `next(err)` with `throw err**`to allow the`async`function to properly reject and pass the error back to the controller's`catch` block.

```javascript
// Remove 'next' from the arguments
userSchema.pre('save', async function () {
  console.log('--- Model: Pre-save hook started ---');

  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hash');
    return; // Just return to continue
  }

  try {
    const salt = await bcrypt.genSalt(10);
    console.log('Salt generated');
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    // No next() call needed here for async functions
  } catch (err) {
    console.error('Error in Model Pre-save:', err);
    throw err; // Throw the error so Mongoose catches it
  }
});
```

---
