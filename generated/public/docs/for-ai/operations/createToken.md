# createToken

POST `/tokens`

Create Token

Creates an expiring, revocable bearer access key for the caller.
The raw JWT is returned only once. Use purpose WEBSITE_LOGIN for full-account website sign-in and explicit OAuth consent, or API for automation (the default). Subject must be ~self or the authenticated principal's own identifier.
Website keys cannot have restricted scopes, expire within seven days and require an existing Google or Apple account session to create. Vended and delegated credentials cannot create independent replacement keys. Website keys cannot be refreshed or exchanged for identity sessions. OAuth connections approved with a website key are independently revocable.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /tokens
runtimePath: /tokens
method: POST
operationId: createToken
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /tokens
post:
  operationId: createToken
  tags:
    - Tokens
  description: >-
    Creates an expiring, revocable bearer access key for the caller.

    The raw JWT is returned only once. Use purpose WEBSITE_LOGIN for full-account website sign-in
    and explicit OAuth consent, or API for automation (the default). Subject must be ~self or the
    authenticated principal's own identifier.

    Website keys cannot have restricted scopes, expire within seven days and require an existing
    Google or Apple account session to create. Vended and delegated credentials cannot create
    independent replacement keys. Website keys cannot be refreshed or exchanged for identity
    sessions. OAuth connections approved with a website key are independently revocable.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/CreateTokenRequest.json
        example:
          purpose: WEBSITE_LOGIN
          label: Plugin reviewer
          expires_in: 86400
  responses:
    '200':
      description: Token created successfully. The raw JWT is returned only once.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/CreateTokenResponse.json
          example:
            id: port1/principals/example
            token: port1/principals/example
            expires_at: '2026-10-08T12:00:00Z'
    '400':
      description: Invalid request (e.g. invalid subject, malformed body)
    '401':
      description: Unauthorized
    '403':
      description: Forbidden - not allowed to create a token for the given subject
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
  summary: Create Token
```

## Linked components

- [CreateTokenRequest.json](/docs/references/schemas/CreateTokenRequest.json)
- [CreateTokenResponse.json](/docs/references/schemas/CreateTokenResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
