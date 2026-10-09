# deleteFlowNode

DELETE `/flow-nodes`

Delete a flow node

Deletes a flow node by its ID. The ID must be provided in the request body.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /flow-nodes
runtimePath: /flow-nodes
method: DELETE
operationId: deleteFlowNode
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /flow-nodes
delete:
  tags:
    - Flow Nodes
  operationId: deleteFlowNode
  summary: Delete a flow node
  description: >-
    Deletes a flow node by its ID. The ID must be provided in the request body.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - id
          properties:
            id:
              type: string
              description: The ID of the flow node to delete.
  responses:
    '200':
      description: Flow node deleted successfully.
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
    '404':
      description: Flow node not found.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource not found
            type: NOT_FOUND
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
