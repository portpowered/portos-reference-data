# createEndpointGroup

POST `/endpoint-groups`

Create an endpoint group

Creates a new endpoint group

## Authorization

```yaml
path: /endpoint-groups
runtimePath: /endpoint-groups
method: POST
operationId: createEndpointGroup
security:
  - oauth2:
      - group:manage
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoint-groups
post:
  operationId: createEndpointGroup
  tags:
    - Endpoint Groups
  summary: Create an endpoint group
  description: Creates a new endpoint group
  security:
    - oauth2:
        - group:manage
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/CreateEndpointGroupRequest.json
        example:
          item:
            name:
              type: PLAIN
              value: My Resource
  responses:
    '200':
      description: Endpoint group created successfully
      headers:
        ETag:
          $ref: /docs/references/headers/ETag.json
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/CreateEndpointGroupResponse.json
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Bad request - invalid request payload
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
- [CreateEndpointGroupRequest.json](/docs/references/schemas/CreateEndpointGroupRequest.json)
- [CreateEndpointGroupResponse.json](/docs/references/schemas/CreateEndpointGroupResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
