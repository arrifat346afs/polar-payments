# User API Guide

## Overview
This document provides information about the User API endpoint in this application. The API has been updated to use Convex as the data source instead of Polar.

## Endpoint

```
GET /api/user
```

## Authentication
The endpoint requires authentication via Clerk. The user must be logged in to access this endpoint.

## Response

### Success Response (200 OK)

```json
{
  "userId": "user_123456789",
  "user": {
    // User data from Convex
    "createdAt": "2023-01-01T00:00:00.000Z",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://example.com/avatar.jpg",
    "userId": "user_123456789",
    "subscription": "subscription_123",
    "credits": "100",
    "tokenIdentifier": "user_123456789",
    "_id": "abcdef123456"
  },
  "subscription": {
    // Subscription data from Convex
    "userId": "user_123456789",
    "polarId": "subscription_123",
    "polarPriceId": "price_123",
    "currency": "usd",
    "interval": "month",
    "status": "active",
    "currentPeriodStart": 1672531200000,
    "currentPeriodEnd": 1675209600000,
    "cancelAtPeriodEnd": false,
    "amount": 1000,
    "startedAt": 1672531200000,
    "_id": "ghijkl789012"
  },
  "hasActiveSubscription": true
}
```

### Error Responses

#### 401 Unauthorized
Returned when the user is not authenticated or the Convex token cannot be generated.

```json
{
  "error": "unauthorized",
  "message": "User is not authenticated"
}
```

Or:

```json
{
  "error": "token_error",
  "message": "Failed to generate Convex authentication token"
}
```

#### 500 Internal Server Error
Returned when there's an error fetching data from Convex or another unexpected error.

```json
{
  "error": "convex_api_error",
  "message": "Error fetching data from Convex",
  "details": "Error message details"
}
```

Or:

```json
{
  "error": "server_error",
  "message": "An unexpected error occurred",
  "details": "Error message details"
}
```

## Implementation Details

The API endpoint now:

1. Authenticates the user using Clerk
2. Generates a Convex authentication token
3. Fetches user data from the Convex `users` table using the `getUserByToken` query
4. Fetches subscription data from the Convex `subscriptions` table using the `getUserSubscription` query
5. Combines the data and returns it as a JSON response

## Debugging

If you encounter issues with the API, check the server logs for detailed error messages. Common issues include:

1. Authentication problems with Clerk
2. Missing or invalid Convex authentication token
3. Errors in the Convex queries or database structure

## Migration from Polar

This API previously used Polar for subscription data. It has been migrated to use Convex for both user and subscription data to avoid issues with Polar API token expiration and to consolidate data sources.
