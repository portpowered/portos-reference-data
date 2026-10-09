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
          $ref: '#/components/schemas/UpsertAccessControlRuleRequest'
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
            $ref: '#/components/schemas/UpsertAccessControlRuleResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
            code: internal-server-error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
