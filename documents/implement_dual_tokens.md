### Refactor

**The goal** from JWT token to dual tokens with refresh token

**The problem**

- **Security**: JWT tokens are vulnerable to XSS attacks
- **UX**: Users need to log in frequently due to short token expiry
- **Maintainability**: Single token approach complicates security measures

**The solution**

- **Access Token**: Short-lived (15 min), stored in localStorage
- **Refresh Token**: Long-lived (7 days), stored in HttpOnly cookie
- **Token Rotation**: New refresh token issued on each refresh
- **Automatic Refresh**: Frontend automatically refreshes tokens when needed

**"implement dual tokens"**
"I used a dual-token strategy to balance security and UX. The access token (15 min, localStorage) authorizes API calls but has a short expiry to limit XSS damage. The refresh token (7 days, HttpOnly cookie) is protected from XSS since JavaScript can't read it. I also implemented token rotation—each refresh generates a new refresh token, and I store a hash in the database to detect reuse attacks. If someone steals a refresh token and tries to use it after legitimate use, I invalidate all sessions as a security measure."

**The changes**

| File                 | Changes                                        |
| -------------------- | ---------------------------------------------- |
| `package.json`       | Add `cookie-parser`                            |
| `server.js`          | Add `cookieParser()` middleware                |
| `userModel.js`       | Add `refreshToken` field                       |
| `authController.js`  | Dual tokens, HttpOnly cookie, refresh endpoint |
| `authRoutes.js`      | Add `/refresh` and `/logout` routes            |
| `authMiddleware.js`  | Add `authorizeAdmin` middleware                |
| `auth.js` (frontend) | Rename functions, add `isTokenExpired`         |
| `api.js` (frontend)  | Add automatic token refresh logic              |
| `.env`               | Add `REFRESH_SECRET`                           |

**The result**

- **Security**: Dual tokens with short-lived access tokens and HttpOnly cookies
- **UX**: Automatic token refresh without user intervention
- **Maintainability**: Clear separation of concerns in the codebase

**The trade-offs**

- Increased complexity in token management
- Additional database operations for token storage
- More endpoints to maintain

**The future ideas** To be considered!

- Implement token revocation lists
- Add rate limiting to refresh endpoints
- Consider using JWT with short expiry and refresh tokens for stateless auth

- Implement token revocation lists
- Add rate limiting to refresh endpoints
- Consider using JWT with short expiry and refresh tokens for stateless auth

#### THE FIX

## Summary of Changes Made

### 🟢 Completed Fixes

#### 1. **Fixed Critical Syntax Error** ([`authController.js`](backend/controllers/authController.js:145-150))

```javascript
// BEFORE (broken):
(res.clearCookies('refreshToken'), { httpOnly: true });

// AFTER (fixed):
res.clearCookie('refreshToken', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
});
```

#### 2. **Fixed LoginForm** ([`LoginForm.jsx`](frontend/src/components/reg-auth/LoginForm.jsx:17-27))

```javascript
// BEFORE:
storeAuthData(result.token, email, result.role);
onLogin({ email, role: result.role });

// AFTER:
// storeAuthData is already called in loginUser api function
onLogin({ email: result.user.email, role: result.user.role });
```

Also removed unused `storeAuthData` import.

#### 3. **Added Auth Rate Limiting** ([`app.js`](backend/app.js:41-55))

```javascript
// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message:
    'Too many authentication attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/v1/auth', authLimiter, authRoutes);
```

#### 4. **Conditionalized Debug Logs**

- [`userModel.js`](backend/models/userModel.js:39-49): Removed console.log statements from pre-save hook
- [`userProfileFetcher.js`](frontend/src/components/hooks/userProfileFetcher.js:15-44): Removed debug console.log statements

---

### 🟡 Code for Consideration: Logout with Expired Tokens

**Current Issue:** The logout route requires `authenticateToken` middleware, which means if the access token is expired, users can't logout properly (the API call fails with 401).

**Option 1: Remove authenticateToken from logout route** ([`authRoutes.js`](backend/routes/authRoutes.js:15))

```javascript
// Change from:
router.post('/logout', authenticateToken, logoutUser);

// To:
router.post('/logout', logoutUser);
```

The logout controller already handles invalid refresh tokens gracefully - it tries to verify and clear from DB, but if that fails, it still clears the cookie.

**Option 2: Keep middleware but handle in frontend** ([`api.js`](frontend/src/components/utils/api.js:159-168))
The frontend `logoutUser` function already handles errors gracefully:

```javascript
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearStoredAuth();
    window.location.href = '/login';
  }
};
```

**support reason:**
professional approach for these reasons:

- Defense in Depth: The middleware ensures only authenticated users can hit the logout endpoint (security layer)
- Graceful Degradation: The frontend handles failures without breaking user experience
- State Consistency: Even if the server call fails, local state is cleared
- Common Pattern: Many production apps use this approach

**However**, there's a subtle issue:
If the access token is expired, the logout API call fails with 401, triggering the token refresh interceptor, which then tries to refresh before logout. This creates an unnecessary refresh request.
Even if the API call fails, it clears localStorage and redirects.

Both approaches are professional. Option 1 is slightly cleaner and more efficient (no unnecessary token refresh). Option 2 provides an extra security layer. Your current implementation is fine for production.
Alternative for now:
**Option 1** is cleaner - logout should work regardless of access token state since the refresh token in the HttpOnly cookie is what matters for logout

### Testing Instructions

#### 1. **Test the clearCookie Fix**

```bash
# Start the dev server
npm run dev
```

- Login with valid credentials
- Manually modify the refresh token hash in the database (to simulate reuse)
- Try to refresh the token (wait 15 min or manually delete access token from localStorage and refresh)
- The server should now properly clear the cookie instead of crashing

#### 2. **Test LoginForm Fix**

- Clear browser localStorage and cookies
- Login with valid credentials
- Check browser DevTools > Application > LocalStorage:
  - Should see: `accessToken`, `userEmail`, `userRole`, `userId`
- The user should be redirected and see their email in the UI

#### 3. **Test Rate Limiting**

```bash
# Using curl or Postman, rapidly hit the login endpoint
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrong"}'

# After 10 attempts in 15 minutes, should get:
# "Too many authentication attempts. Please try again after 15 minutes."
```

#### 4. **Test Token Refresh Flow**

- Login
- Open DevTools > Application > LocalStorage
- Delete the `accessToken` (simulating expiry)
- Refresh the page or navigate to a protected route (User Profile)
- The API interceptor should automatically:
  1. Detect 401 error
  2. Call `/auth/refresh` with the HttpOnly cookie
  3. Get new access token
  4. Retry the original request
  5. User sees data without re-logging in

#### 5. **Test Logout**

#### 4. **Test Token Refresh Flow**

- Login
- Open DevTools > Application > LocalStorage
- Delete the `accessToken` (simulating expiry)
- Refresh the page or navigate to a protected route (User Profile)
- The API interceptor should automatically:
  1. Detect 401 error
  2. Call `/auth/refresh` with the HttpOnly cookie
  3. Get new access token
  4. Retry the original request
  5. User sees data without re-logging in

#### 5. **Test Logout**

- Login
- Click logout
- Check:
  - LocalStorage cleared (no accessToken, userEmail, etc.)
  - Cookie cleared (check DevTools > Application > Cookies)
  - Redirected to login page

---

### 🟡 Code for Consideration: Logout with Expired Tokens

What is in my head ... TODO?
The updated logout controller that properly handles token cleanup:

```javascript
// In authController.js
const logout = async (req, res) => {
  try {
    // Clear the refresh token from the database
    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: null },
      { new: true }
    );

    // Clear the HttpOnly cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};
```

---
