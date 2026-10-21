# deleteAccessControlRule

DELETE `/{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}`

Delete Access Control Rule

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
    - Access control
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
    - name: reason
      required: false
      in: query
      schema:
        type: string
        maxLength: 500
      description: Optional operator-supplied reason recorded in the audit log for this deletion.
    - name: If-Match
      in: header
      required: false
      description: >-
        Optional quoted etag of the rule as last read (its `etag` field). When present the deletion
        applies only if it still matches the rule's current etag, otherwise 412 PRECONDITION_FAILED;
        `*` requires the rule to exist. Omitted, the deletion is unconditional.
      schema:
        type: string
        minLength: 1
      example: '"3"'
  responses:
    '200':
      description: Access control rule deleted successfully
    '400':
      description: Invalid request payload
    '412':
      description: The If-Match etag does not match the current access control rule; re-read the rule and retry
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: access control rule changed since it was read; re-read it and retry
            code: PRECONDITION_FAILED
            family: PRECONDITION_FAILED
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
  summary: Delete Access Control Rule
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
