# generateOAuthClientSecret

POST `/port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets`

Generate OAuth Client Secret

Creates an additional secret and returns its plaintext once. Existing secrets remain active until explicitly revoked.

## Authorization

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets
runtimePath: /{namespace}/{principalType}/{principalId}/oauth-clients/{clientId}/secrets
method: POST
operationId: generateOAuthClientSecret
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets
post:
  operationId: generateOAuthClientSecret
  tags:
    - Clients
  summary: Generate OAuth Client Secret
  description: >-
    Creates an additional secret and returns its plaintext once. Existing secrets remain active
    until explicitly revoked.
  parameters:
    - name: principalType
      in: path
      required: true
      schema:
        type: string
    - name: principalId
      in: path
      required: true
      schema:
        type: string
    - name: clientId
      in: path
      required: true
      schema:
        type: string
  responses:
    '200':
      description: Generate OAuth Client Secret response.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/GenerateOAuthClientSecretResponse.json
    '400':
      description: Invalid request path.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
    '401':
      description: Authentication required.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
    '403':
      description: The caller cannot read or manage the selected OAuth client.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
    '404':
      description: OAuth client or secret not found.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
    '500':
      description: Internal server error.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [GenerateOAuthClientSecretResponse.json](/docs/references/schemas/GenerateOAuthClientSecretResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
