# getReadiness

GET `/ready`

Readiness check

Returns 200 with the key ID that signs new tokens once the server can sign, or 503 when it cannot. Use it after a deploy to confirm which signing key is live. It requires no authentication and reports nothing else.

## Authorization

```yaml
path: /ready
runtimePath: /ready
method: GET
operationId: getReadiness
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /ready
get:
  operationId: getReadiness
  tags:
    - Infrastructure
  summary: Readiness check
  description: >-
    Returns 200 with the key ID that signs new tokens once the server can sign, or 503 when it
    cannot. Use it after a deploy to confirm which signing key is live. It requires no
    authentication and reports nothing else.
  security: []
  responses:
    '200':
      description: Server is ready and names its signing key.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/ReadinessResponse.json
          example:
            status: READY
            signingKeyId: pilot-2
    '503':
      description: No signing key is available, so the server cannot issue tokens.
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

- [ReadinessResponse.json](/docs/references/schemas/ReadinessResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
