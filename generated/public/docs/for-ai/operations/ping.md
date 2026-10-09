# ping

GET `/ping`

Health check

Returns a 200 OK response indicating the server is running. Used by load balancers and monitoring systems to verify service availability.

## Authorization

```yaml
path: /ping
runtimePath: /ping
method: GET
operationId: ping
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /ping
get:
  operationId: ping
  tags:
    - Infrastructure
  summary: Health check
  description: >-
    Returns a 200 OK response indicating the server is running. Used by load balancers and
    monitoring systems to verify service availability.
  security: []
  responses:
    '200':
      description: Server is healthy
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
