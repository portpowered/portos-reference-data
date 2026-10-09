# createOAuthClient

POST `/oauth-clients`



Creates a new OAuth client registration.
This endpoint allows you to register a new OAuth client with Port OS.  The client will be assigned a unique client ID and a client secret that  can be used for OAuth authentication flows.
The client secret is only returned once during creation, so make sure to  store it securely.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /oauth-clients
runtimePath: /oauth-clients
method: POST
operationId: createOAuthClient
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /oauth-clients
post:
  operationId: createOAuthClient
  tags:
    - Clients
  description: >-
    Creates a new OAuth client registration.

    This endpoint allows you to register a new OAuth client with Port OS.  The client will be
    assigned a unique client ID and a client secret that  can be used for OAuth authentication
    flows.

    The client secret is only returned once during creation, so make sure to  store it securely.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/OAuthClientRegistrationRequest.json
        example:
          clientName: port1/principals/example
  responses:
    '200':
      description: OAuth client created successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/CreateOAuthClientResponse.json
          example:
            clientId: port1/principals/example
            clientSecret: port1/principals/example
    '400':
      description: Invalid request payload
    '401':
      description: Unauthorized - invalid or missing authentication token
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [CreateOAuthClientResponse.json](/docs/references/schemas/CreateOAuthClientResponse.json)
- [OAuthClientRegistrationRequest.json](/docs/references/schemas/OAuthClientRegistrationRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
