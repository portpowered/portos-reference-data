# getMetrics

GET `/metrics`

Prometheus metrics

Returns server metrics in Prometheus text exposition format. This endpoint is intentionally unauthenticated so that Prometheus can scrape it.

## Authorization

```yaml
path: /metrics
runtimePath: /metrics
method: GET
operationId: getMetrics
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /metrics
get:
  operationId: getMetrics
  tags:
    - Infrastructure
  summary: Prometheus metrics
  description: >-
    Returns server metrics in Prometheus text exposition format. This endpoint is intentionally
    unauthenticated so that Prometheus can scrape it.
  security: []
  responses:
    '200':
      description: Prometheus metrics retrieved successfully
      content:
        text/plain:
          schema:
            type: string
            description: Prometheus text exposition format metrics
          example: pong
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
