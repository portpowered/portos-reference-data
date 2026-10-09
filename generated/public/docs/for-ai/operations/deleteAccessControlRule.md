# deleteAccessControlRule

DELETE `/{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}`



Delete an access control rule.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}
runtimePath: /{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}
method: DELETE
operationId: deleteAccessControlRule
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}
delete:
  tags:
    - Access Control Rules
  operationId: deleteAccessControlRule
  description: >-
    Delete an access control rule.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: namespace
      required: true
      in: path
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      required: true
      in: path
      schema:
        type: string
      description: The type of principal
    - name: principalId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the principal
    - name: ruleId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the access control rule to delete
  responses:
    '200':
      description: Access control rule deleted successfully
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

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
