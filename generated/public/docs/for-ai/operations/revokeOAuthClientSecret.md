# revokeOAuthClientSecret

DELETE `/port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets/{secretId}`

Revoke OAuth Client Secret

Permanently revokes one secret belonging to the selected OAuth client. Other secrets remain active.

## Authorization

```yaml
path: >-
  /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets/{secretId}
runtimePath: >-
  /{namespace}/{principalType}/{principalId}/oauth-clients/{clientId}/secrets/{secretId}
method: DELETE
operationId: revokeOAuthClientSecret
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets/{secretId}
delete:
  operationId: revokeOAuthClientSecret
  tags:
    - Clients
  summary: Revoke OAuth Client Secret
  description: >-
    Permanently revokes one secret belonging to the selected OAuth client. Other secrets remain
    active.
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
    - name: secretId
      in: path
      required: true
      schema:
        type: string
  responses:
    '200':
      description: Revoke OAuth Client Secret response.
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

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
