# enumeratePlugins

GET `/plugins`



Lists all available plugins

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugins
runtimePath: /plugins
method: GET
operationId: enumeratePlugins
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugins
get:
  operationId: enumeratePlugins
  tags:
    - Plugins
  description: >-
    Lists all available plugins


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: expand
      in: query
      description: Space-delimited list of fields to expand (metadata)
      required: false
      schema:
        type: array
        items:
          type: string
      style: form
      explode: false
    - name: id
      in: query
      description: Full path ID of a specific plugin to retrieve (e.g. port1/systems/zero/plugins/{uuid})
      required: false
      schema:
        type: string
    - name: nextToken
      in: query
      description: Opaque cursor token returned by a previous query response.
      required: false
      schema:
        type: string
      examples:
        next-page:
          value: abc123
    - name: maxResults
      in: query
      description: Maximum number of results to return.
      required: false
      schema:
        type: integer
      examples:
        page-size:
          value: 50
  responses:
    '200':
      description: Plugins retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumeratePluginsResponse'
          example:
            results: []
            paginationContext:
              nextToken: abc123
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
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
