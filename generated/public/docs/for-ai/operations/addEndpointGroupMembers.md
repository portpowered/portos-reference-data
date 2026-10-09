# addEndpointGroupMembers

POST `/{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/add-members`

Add members to an endpoint group

Adds one or more endpoint members to an existing endpoint group

## Authorization

```yaml
path: >-
  /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/add-members
runtimePath: >-
  /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/add-members
method: POST
operationId: addEndpointGroupMembers
security:
  - oauth2:
      - group:manage
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/add-members
post:
  operationId: addEndpointGroupMembers
  tags:
    - Endpoint Groups
  summary: Add members to an endpoint group
  description: Adds one or more endpoint members to an existing endpoint group
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
      description: The ID of the endpoint group
    - $ref: '#/components/parameters/IfMatch'
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/AddEndpointGroupMembersRequest'
        example:
          memberEndpointIds: []
  responses:
    '202':
      description: Members addition accepted
      headers:
        ETag:
          $ref: '#/components/headers/ETag'
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
      description: Endpoint group not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource not found
            type: NOT_FOUND
    '412':
      description: The If-Match etag does not match the current group version; re-read the group and retry
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: group etag does not match; re-read the group and retry
            type: PRECONDITION_FAILED
            family: PRECONDITION_FAILED
    '428':
      description: The If-Match header is missing
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: If-Match header is required; send the group's etag
            type: PRECONDITION_REQUIRED
            family: PRECONDITION_REQUIRED
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
