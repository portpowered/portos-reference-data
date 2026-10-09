# upsertEndpoint

POST `/endpoints`



Creates or updates an endpoint

## Authorization

```yaml
path: /endpoints
runtimePath: /endpoints
method: POST
operationId: upsertEndpoint
security:
  - oauth2:
      - endpoint:write
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoints
post:
  operationId: upsertEndpoint
  tags:
    - Endpoints
  description: Creates or updates an endpoint
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertEndpointRequest'
        example:
          id: port1/principals/example/endpoints/light-1
          name:
            type: PLAIN
            value: Office light
          type: LIGHT
  responses:
    '200':
      description: Endpoint upserted successfully
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:write
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
