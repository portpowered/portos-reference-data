# deleteEndpoint

DELETE `/endpoints`



Deletes an endpoint

## Authorization

```yaml
path: /endpoints
runtimePath: /endpoints
method: DELETE
operationId: deleteEndpoint
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
delete:
  operationId: deleteEndpoint
  tags:
    - Endpoints
  description: Deletes an endpoint
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/DeleteEndpointRequest'
        example:
          id: port1/principals/user123/resources/abc-123
  responses:
    '200':
      description: Endpoint deleted successfully
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
