# enumerateAuthLinkClientCredentials

GET `/auth-links/oauth-client-credentials`

Enumerate reusable OAuth client credentials

Lists metadata of the caller's own OAuth client secrets that the caller's auth links for the plugin reference, never the secret values. Only links the caller may read are considered. The list is self-scoped and needs no plugin-establish-link permission.

## Authorization

```yaml
path: /auth-links/oauth-client-credentials
runtimePath: /auth-links/oauth-client-credentials
method: GET
operationId: enumerateAuthLinkClientCredentials
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /auth-links/oauth-client-credentials
get:
  operationId: enumerateAuthLinkClientCredentials
  tags:
    - Auth Links
  summary: Enumerate reusable OAuth client credentials
  description: >-
    Lists metadata of the caller's own OAuth client secrets that the caller's auth links for the
    plugin reference, never the secret values. Only links the caller may read are considered. The
    list is self-scoped and needs no plugin-establish-link permission.
  parameters:
    - name: pluginId
      in: query
      required: true
      description: The plugin whose OAuth client credentials to list.
      schema:
        type: string
    - name: maxResults
      in: query
      required: false
      description: Maximum number of results to return.
      schema:
        type: integer
        minimum: 1
        maximum: 100
    - name: nextToken
      in: query
      required: false
      description: Opaque cursor token returned by a previous response.
      schema:
        type: string
  responses:
    '200':
      description: OAuth client credentials retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/AuthLinkClientCredentialSummaries.json
          example:
            results: []
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [AuthLinkClientCredentialSummaries.json](/docs/references/schemas/AuthLinkClientCredentialSummaries.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
