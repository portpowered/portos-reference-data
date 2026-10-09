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
          $ref: /docs/references/schemas/EndpointQueryRequest.json
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
            $ref: /docs/references/schemas/EndpointQueryResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request - missing required parameters
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Bad request - missing required parameters
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Unauthorized - invalid or missing authentication token
            code: UNAUTHORIZED
            family: AUTHENTICATION
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
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
```

## Linked components

- [EndpointQueryRequest.json](/docs/references/schemas/EndpointQueryRequest.json)
- [EndpointQueryResponse.json](/docs/references/schemas/EndpointQueryResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
