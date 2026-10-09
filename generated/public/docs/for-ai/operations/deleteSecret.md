# deleteSecret

DELETE `/port1/{principalType}/{principalId}/secrets/{secretId}`



Deletes a secret

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /port1/{principalType}/{principalId}/secrets/{secretId}
runtimePath: /{namespace}/{principalType}/{principalId}/secrets/{secretId}
method: DELETE
operationId: deleteSecret
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/secrets/{secretId}
delete:
  operationId: deleteSecret
  tags:
    - Secrets
  description: >-
    Deletes a secret


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that the secret belongs to.
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that the secret belongs to.
    - name: secretId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the secret to delete.
  responses:
    '200':
      description: Secret deleted successfully
    '400':
      description: Invalid request payload
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
