# upsertAccessControlRule

POST `/access-control-rules`



Upsert an access control rule.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /access-control-rules
runtimePath: /access-control-rules
method: POST
operationId: upsertAccessControlRule
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /access-control-rules
post:
  tags:
    - Access Control Rules
  operationId: upsertAccessControlRule
  description: >-
    Upsert an access control rule.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/UpsertAccessControlRuleRequest.json
        example:
          operation: port1/principals/example
          resource: port1/users/alice/endpoints/thermostat-zero
          identity: port1/account/john/users/alice
          effect: ALLOW
  responses:
    '200':
      description: Access control rule upserted successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/UpsertAccessControlRuleResponse.json
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [UpsertAccessControlRuleRequest.json](/docs/references/schemas/UpsertAccessControlRuleRequest.json)
- [UpsertAccessControlRuleResponse.json](/docs/references/schemas/UpsertAccessControlRuleResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
