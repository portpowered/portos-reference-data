# deleteGroupRoute

DELETE `/{namespace}/{principalType}/{principalId}/group-routes/{groupId}`

Delete a group route

Deletes a group route by ID

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/group-routes/{groupId}
runtimePath: /{namespace}/{principalType}/{principalId}/group-routes/{groupId}
method: DELETE
operationId: deleteGroupRoute
security:
  - oauth2:
      - group:manage
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/group-routes/{groupId}
delete:
  operationId: deleteGroupRoute
  tags:
    - Endpoint Group Routes
  summary: Delete a group route
  description: Deletes a group route by ID
  security:
    - oauth2:
        - group:manage
    - bearerAuth: []
  parameters:
    - name: namespace
      in: path
      required: true
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal
    - name: groupId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the group route to delete
  responses:
    '200':
      description: Group route deleted successfully
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '404':
      description: Group route not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource not found
            type: NOT_FOUND
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: true
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
