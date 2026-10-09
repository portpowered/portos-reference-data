# upsertFlow

POST `/flows`

Create or update a flow

Creates or updates a flow definition. Flows are general operations that take in messages, send messages, perform computation, and read from storage.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /flows
runtimePath: /flows
method: POST
operationId: upsertFlow
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /flows
post:
  tags:
    - Flows
  operationId: upsertFlow
  summary: Create or update a flow
  description: >-
    Creates or updates a flow definition. Flows are general operations that take in messages, send
    messages, perform computation, and read from storage.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertFlowRequest'
        example:
          name:
            type: PLAIN
            value: My Resource
  responses:
    '200':
      description: OK
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpsertFlowResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Bad request — invalid request payload.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
