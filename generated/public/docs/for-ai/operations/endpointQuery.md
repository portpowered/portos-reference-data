# endpointQuery

POST `/endpoint-query`



Query for endpoints

## Authorization

```yaml
path: /endpoint-query
runtimePath: /endpoint-query
method: POST
operationId: endpointQuery
security:
  - oauth2:
      - endpoint:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoint-query
post:
  operationId: endpointQuery
  tags:
    - Endpoints
  description: Query for endpoints
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/EndpointQueryRequest'
        example:
          query:
            match:
              key: name
              value: test
  responses:
    '200':
      description: Endpoints retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EndpointQueryResponse'
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request - missing required parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Bad request - missing required parameters
            type: BAD_REQUEST
            family: BAD_REQUEST
            code: bad-request
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Unauthorized - invalid or missing authentication token
            type: UNAUTHORIZED
            family: AUTHENTICATION
            code: unauthorized
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
            code: internal-server-error
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
