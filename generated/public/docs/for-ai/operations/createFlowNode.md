# createFlowNode

POST `/flow-nodes`

Create a flow node

Creates a new flow node from the first node definition in the provided flow request. The node's ports are validated against the schema registry and its configuration is verified.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /flow-nodes
runtimePath: /flow-nodes
method: POST
operationId: createFlowNode
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /flow-nodes
post:
  tags:
    - Flow Nodes
  operationId: createFlowNode
  summary: Create a flow node
  description: >-
    Creates a new flow node from the first node definition in the provided flow request. The node's
    ports are validated against the schema registry and its configuration is verified.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/UpsertFlowRequest.json
        example:
          name:
            type: PLAIN
            value: My Resource
  responses:
    '200':
      description: Flow node created successfully.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/FlowNode.json
          example:
            id: port1/principals/example
    '400':
      description: Bad request — invalid request payload or validation failure.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
    '500':
      description: Internal server error.
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
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [FlowNode.json](/docs/references/schemas/FlowNode.json)
- [UpsertFlowRequest.json](/docs/references/schemas/UpsertFlowRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
