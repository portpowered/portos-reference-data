# listOAuthClientSecrets

GET `/port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets`

List OAuth Client Secrets

Lists active masked secrets for the selected OAuth client. Plaintext and hashes are never returned.

## Authorization

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets
runtimePath: /{namespace}/{principalType}/{principalId}/oauth-clients/{clientId}/secrets
method: GET
operationId: listOAuthClientSecrets
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets
get:
  operationId: listOAuthClientSecrets
  tags:
    - Clients
  summary: List OAuth Client Secrets
  description: >-
    Lists active masked secrets for the selected OAuth client. Plaintext and hashes are never
    returned.
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
      description: List OAuth Client Secrets response.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/ListOAuthClientSecretsResponse.json
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
- [ListOAuthClientSecretsResponse.json](/docs/references/schemas/ListOAuthClientSecretsResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
