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
          $ref: '#/components/schemas/CreateEndpointGroupRequest'
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
          $ref: '#/components/headers/ETag'
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateEndpointGroupResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Bad request - invalid request payload
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
