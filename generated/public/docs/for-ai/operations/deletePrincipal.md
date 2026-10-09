# deletePrincipal

DELETE `/{namespace}/{principalType}/{principalId}`



Deletes a principal

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}
runtimePath: /{namespace}/{principalType}/{principalId}
method: DELETE
operationId: deletePrincipal
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}
delete:
  operationId: deletePrincipal
  tags:
    - Principals
  description: >-
    Deletes a principal


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: namespace
      in: path
      required: true
      schema:
        type: string
      description: The namespace of the principal that the flow belongs to.
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that the flow belongs to.
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that the flow belongs to.
  responses:
    '200':
      description: Principal deleted successfully
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
