# Polar API Token Guide

## Overview
This document provides guidance on managing the Polar API access token used in this application. The Polar API is used to manage subscriptions and payments.

## Token Expiration
Polar API access tokens have an expiration period. When a token expires, API calls will return a `401 Unauthorized` error with the message `invalid_token`.

## How to Generate a New Token

1. Log in to your [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to Settings > API Tokens
3. Click "Create New Token"
4. Give the token a descriptive name (e.g., "App Integration Token")
5. Select the appropriate scopes for your application (at minimum, you'll need `subscriptions:read`)
6. Click "Create Token"
7. Copy the generated token immediately (it will only be shown once)

## Updating the Token in Your Application

### Local Development
1. Open your `.env.local` file
2. Replace the value of `POLAR_ACCESS_TOKEN` with your new token
3. Restart your development server

### Production Environment
1. Update the environment variable in your hosting platform:
   - For Vercel: Go to Project Settings > Environment Variables
   - For other platforms: Refer to their documentation on updating environment variables
2. Redeploy your application or restart the server to apply the changes

## Troubleshooting

If you encounter a `401 Unauthorized` error with the message `invalid_token` when making requests to the Polar API, it typically means your token has expired and needs to be refreshed.

Error example:
```json
{
  "error": "invalid_token", 
  "error_description": "The access token provided is expired, revoked, malformed, or invalid for other reasons."
}
```

Follow the steps above to generate a new token and update it in your application.

## Best Practices

1. **Security**: Keep your API tokens secure and never commit them to version control
2. **Monitoring**: Set up monitoring to detect when API calls start failing with authentication errors
3. **Rotation**: Regularly rotate your tokens as a security best practice
4. **Documentation**: Document when tokens were last updated and when they're expected to expire

## Additional Resources

- [Polar API Documentation](https://docs.polar.sh/api)
- [Authentication with Polar](https://docs.polar.sh/documentation/integration-guides/authenticating-with-polar)
