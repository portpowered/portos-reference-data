# deleteEndpointGroup

DELETE `/{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}`

Delete an endpoint group

Delete an endpoint group by ID.


## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}
runtimePath: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}
method: DELETE
operationId: deleteEndpointGroup
security:
  - oauth2:
      - group:manage
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}
delete:
  tags:
    - Endpoint Groups
  operationId: deleteEndpointGroup
  summary: Delete an endpoint group
  description: |
    Delete an endpoint group by ID.
  security:
    - oauth2:
        - group:manage
    - bearerAuth: []
  parameters:
    - name: namespace
      required: true
      in: path
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      required: true
      in: path
      schema:
        type: string
      description: The type of principal
    - name: principalId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the principal
    - name: groupId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the endpoint group to delete
    - $ref: /docs/references/parameters/IfMatch.json
  responses:
    '202':
      description: Endpoint group deletion accepted
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
    '404':
      description: Endpoint group not found
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Resource not found
            code: NOT_FOUND
            family: NOT_FOUND
    '412':
      description: The If-Match etag does not match the current group version; re-read the group and retry
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: group etag does not match; re-read the group and retry
            code: PRECONDITION_FAILED
            family: PRECONDITION_FAILED
    '428':
      description: The If-Match header is missing
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: If-Match header is required; send the group's etag
            code: PRECONDITION_REQUIRED
            family: PRECONDITION_REQUIRED
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
  x-portos-delegated: true
  x-portos-resource-permission: true
```

## Linked components

- [IfMatch.json](/docs/references/parameters/IfMatch.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
