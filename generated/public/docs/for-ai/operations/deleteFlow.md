# deleteFlow

DELETE `/{principalType}/{principalId}/flows/{flowId}`

Delete a flow

Deletes a flow by its ID. The flow is identified by the principal type, principal ID, and flow ID.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{principalType}/{principalId}/flows/{flowId}
runtimePath: /{principalType}/{principalId}/flows/{flowId}
method: DELETE
operationId: deleteFlow
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{principalType}/{principalId}/flows/{flowId}
delete:
  tags:
    - Flows
  operationId: deleteFlow
  summary: Delete a flow
  description: >-
    Deletes a flow by its ID. The flow is identified by the principal type, principal ID, and flow
    ID.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  parameters:
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that the flow belongs to.
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that the flow belongs to.
    - name: flowId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the flow to delete.
  responses:
    '200':
      description: Flow deleted successfully.
    '400':
      description: Bad request — missing or invalid parameters.
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
      description: Flow not found.
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
