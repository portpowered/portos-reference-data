# deleteOAuthClient

DELETE `/port1/{principalType}/{principalId}/oauth-clients/{clientId}`



Deletes an OAuth client.
This permanently removes the OAuth client and invalidates all associated  tokens. This action cannot be undone.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}
runtimePath: /{namespace}/{principalType}/{principalId}/oauth-clients/{clientId}
method: DELETE
operationId: deleteOAuthClient
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}
delete:
  operationId: deleteOAuthClient
  tags:
    - Clients
  description: >-
    Deletes an OAuth client.

    This permanently removes the OAuth client and invalidates all associated  tokens. This action
    cannot be undone.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that owns the OAuth client
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that owns the OAuth client
    - name: clientId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the OAuth client to delete
  responses:
    '200':
      description: OAuth client deleted successfully
    '400':
      description: Invalid request payload
    '401':
      description: Unauthorized - invalid or missing authentication token
    '404':
      description: OAuth client not found
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
