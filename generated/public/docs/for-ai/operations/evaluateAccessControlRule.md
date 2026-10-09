# evaluateAccessControlRule

POST `/access-control-rules/evaluate`



Evaluate an access control rule.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /access-control-rules/evaluate
runtimePath: /access-control-rules/evaluate
method: POST
operationId: evaluateAccessControlRule
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /access-control-rules/evaluate
post:
  tags:
    - Access Control Rules
  operationId: evaluateAccessControlRule
  description: >-
    Evaluate an access control rule.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/EvaluateAccessControlRuleRequest.json
        example:
          requests: port1/principals/example
  responses:
    '200':
      description: Access control rule evaluated successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EvaluateAccessControlRuleResponse.json
          example:
            id: port1/principals/user123/resources/abc-123
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

- [EvaluateAccessControlRuleRequest.json](/docs/references/schemas/EvaluateAccessControlRuleRequest.json)
- [EvaluateAccessControlRuleResponse.json](/docs/references/schemas/EvaluateAccessControlRuleResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
