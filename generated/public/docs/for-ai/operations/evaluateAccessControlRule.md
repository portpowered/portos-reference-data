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
          $ref: '#/components/schemas/EvaluateAccessControlRuleRequest'
        example:
          requests: port1/principals/example
  responses:
    '200':
      description: Access control rule evaluated successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EvaluateAccessControlRuleResponse'
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

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
