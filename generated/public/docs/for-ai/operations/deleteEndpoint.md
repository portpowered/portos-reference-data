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
          $ref: /docs/references/schemas/DeleteEndpointRequest.json
        example:
          id: port1/principals/example/endpoints/light-1
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

## Linked components

- [DeleteEndpointRequest.json](/docs/references/schemas/DeleteEndpointRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
