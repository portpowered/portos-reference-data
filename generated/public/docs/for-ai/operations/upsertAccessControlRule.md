# upsertAccessControlRule

POST `/access-control-rules`

Upsert Access Control Rule

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
    - Access control
  operationId: upsertAccessControlRule
  description: >-
    Upsert an access control rule.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: If-Match
      in: header
      required: false
      description: >-
        Optional quoted etag of the rule as last read (its `etag` field). When present the upsert
        applies only if it still matches the rule's current etag, otherwise 412 PRECONDITION_FAILED;
        `*` requires the rule to exist. Omitted, the upsert is unconditional.
      schema:
        type: string
        minLength: 1
      example: '"3"'
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
      headers:
        ETag:
          $ref: /docs/references/headers/ETag.json
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
  summary: Upsert Access Control Rule
```

## Linked components

- [ETag.json](/docs/references/headers/ETag.json)
- [Error.json](/docs/references/schemas/Error.json)
- [UpsertAccessControlRuleRequest.json](/docs/references/schemas/UpsertAccessControlRuleRequest.json)
- [UpsertAccessControlRuleResponse.json](/docs/references/schemas/UpsertAccessControlRuleResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
