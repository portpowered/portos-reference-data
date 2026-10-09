# authorizeDevice

POST `/oauth/authorize-device`

OAuth2 Authorize Device by User Code

This endpoint allows an authenticated user to grant consent for device authorization. It creates an authorization code with the owner principal and marks the device authentication as authorized.
The endpoint validates the user_code, checks that the requested scopes are valid, extracts the authenticated user principal from the context, and authorizes the deviceauth. This is the final step in the device code flow before the device can exchange the device_code for tokens.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /oauth/authorize-device
runtimePath: /oauth/authorize-device
method: POST
operationId: authorizeDevice
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/authorize-device
post:
  operationId: authorizeDevice
  tags:
    - Internal
  summary: OAuth2 Authorize Device by User Code
  description: >-
    This endpoint allows an authenticated user to grant consent for device authorization. It creates
    an authorization code with the owner principal and marks the device authentication as
    authorized.

    The endpoint validates the user_code, checks that the requested scopes are valid, extracts the
    authenticated user principal from the context, and authorizes the deviceauth. This is the final
    step in the device code flow before the device can exchange the device_code for tokens.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/AuthorizeDeviceRequest'
  responses:
    '200':
      description: Device authorization successful
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/AuthorizeDeviceResponse'
    '400':
      description: Invalid request (e.g., missing user_code, invalid user_code, or invalid scopes)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
    '401':
      description: Unauthorized (missing or invalid authentication token)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
  x-portos-delegated: false
  x-portos-resource-permission: false
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
