# getOAuthProtectedResourceMetadata

GET `/.well-known/oauth-protected-resource`

OAuth protected resource metadata

Returns OAuth 2.0 Protected Resource Metadata as defined by RFC 9728. This endpoint is publicly accessible and does not require authentication. Responses are cached for one hour.


## Authorization

```yaml
path: /.well-known/oauth-protected-resource
runtimePath: /.well-known/oauth-protected-resource
method: GET
operationId: getOAuthProtectedResourceMetadata
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /.well-known/oauth-protected-resource
get:
  operationId: getOAuthProtectedResourceMetadata
  tags:
    - Infrastructure
  summary: OAuth protected resource metadata
  description: >
    Returns OAuth 2.0 Protected Resource Metadata as defined by RFC 9728. This endpoint is publicly
    accessible and does not require authentication. Responses are cached for one hour.
  security: []
  responses:
    '200':
      description: Protected resource metadata retrieved successfully
      content:
        application/json:
          schema:
            type: object
            properties:
              resource:
                type: string
                description: The protected resource identifier
                example: https://portpowered.com/mcp
              authorization_servers:
                type: array
                items:
                  type: string
                description: Authorization servers that can issue tokens for this resource
                example:
                  - https://portpowered.com
              scopes_supported:
                type: array
                items:
                  type: string
                description: Scopes supported by this resource
                example:
                  - mcp:read
                  - mcp:write
                  - mcp:admin
              bearer_methods_supported:
                type: array
                items:
                  type: string
                description: Methods supported for presenting bearer tokens
                example:
                  - header
          example:
            key: value
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
