# removeEndpointGroupMembers

POST `/{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/remove-members`

Remove members from an endpoint group

Removes one or more endpoint members from an existing endpoint group

## Authorization

```yaml
path: >-
  /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/remove-members
runtimePath: >-
  /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/remove-members
method: POST
operationId: removeEndpointGroupMembers
security:
  - oauth2:
      - group:manage
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/remove-members
post:
  operationId: removeEndpointGroupMembers
  tags:
    - Endpoint Groups
  summary: Remove members from an endpoint group
  description: Removes one or more endpoint members from an existing endpoint group
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
    - $ref: /docs/references/parameters/IfMatch.json
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/RemoveEndpointGroupMembersRequest.json
        example:
          memberEndpointIds: []
  responses:
    '202':
      description: Members removal accepted
      headers:
        ETag:
          $ref: /docs/references/headers/ETag.json
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

- [ETag.json](/docs/references/headers/ETag.json)
- [IfMatch.json](/docs/references/parameters/IfMatch.json)
- [Error.json](/docs/references/schemas/Error.json)
- [RemoveEndpointGroupMembersRequest.json](/docs/references/schemas/RemoveEndpointGroupMembersRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
