# API Library Structure

This directory contains organized API modules for interacting with the backend.

## Structure

```
lib/api/
├── index.ts              # Main entry point - exports all API functions
├── common/
│   ├── storage.ts        # Auth token and user data storage utilities
│   └── api-client.ts     # Base API client with auth headers
├── auth/
│   └── auth-api.ts       # Authentication related APIs
└── user/
    └── user-api.ts       # User management APIs
```

## Usage

All API functions are exported from the main `lib/api` directory:

```typescript
import { login, setupAuth, clearAuthData } from "@/lib/api";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/lib/api";
```

## Modules

### Common Module

**storage.ts** - Manages browser storage for auth data

- `getAuthToken()` - Get JWT token from localStorage
- `setAuthToken(token)` - Save JWT token
- `removeAuthToken()` - Remove JWT token
- `getUserData()` - Get user data from localStorage
- `setUserData(userData)` - Save user data
- `removeUserData()` - Remove user data
- `clearAuthData()` - Clear all auth data (token, user data, cookies)

**api-client.ts** - Base HTTP client

- `apiClient(endpoint, options)` - Makes authenticated API requests

### Auth Module

**auth-api.ts** - Authentication endpoints

- `login(email, password)` - Login user
- `setupAuth(token, user)` - Setup auth after successful login

### User Module

**user-api.ts** - User management endpoints

- `createUser(formData)` - Create new user (admin only)
- `getAllUsers()` - Get all users (admin only)
- `getUserById(id)` - Get user by ID (admin only)
- `updateUser(id, formData)` - Update user (admin only)
- `deleteUser(id)` - Delete user (admin only)
- `updateAuthUserProfile(id, formData)` - Update own profile (authenticated users)

## Adding New Modules

To add a new API module (e.g., recipes):

1. Create `lib/api/recipe/recipe-api.ts`
2. Define your API functions
3. Export them in `lib/api/index.ts`

Example:

```typescript
// lib/api/recipe/recipe-api.ts
import { apiClient } from "../common/api-client";

export const getAllRecipes = async () => {
  const response = await apiClient("/recipes");
  return response.json();
};

// lib/api/index.ts
export { getAllRecipes } from "./recipe/recipe-api";
```
