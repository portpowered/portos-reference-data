# refreshAuthLinkToken

POST `/auth-links/refresh`

Refresh tokens for an auth link

Refreshes the credentials associated with an auth link. For OAuth-based links this exchanges the refresh token for a new access token via the plugin's token endpoint. For API-key-based links the key is returned as-is. The auth link is updated with the refreshed credentials.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /auth-links/refresh
runtimePath: /auth-links/refresh
method: POST
operationId: refreshAuthLinkToken
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /auth-links/refresh
post:
  operationId: refreshAuthLinkToken
  tags:
    - Auth Links
  summary: Refresh tokens for an auth link
  description: >-
    Refreshes the credentials associated with an auth link. For OAuth-based links this exchanges the
    refresh token for a new access token via the plugin's token endpoint. For API-key-based links
    the key is returned as-is. The auth link is updated with the refreshed credentials.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - authLinkId
          properties:
            authLinkId:
              type: string
              description: The ID of the auth link to refresh tokens for
        example:
          authLinkId: port1/principals/example
  responses:
    '200':
      description: Token refreshed successfully
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
