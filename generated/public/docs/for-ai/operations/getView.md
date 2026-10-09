# getView

GET `/{namespace}/{principalType}/{principalId}/views/{viewId}`



Get a view by ID.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/views/{viewId}
runtimePath: /{namespace}/{principalType}/{principalId}/views/{viewId}
method: GET
operationId: getView
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/views/{viewId}
get:
  tags:
    - Views
  operationId: getView
  description: >-
    Get a view by ID.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: namespace
      required: true
      in: path
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      required: true
      in: path
      schema:
        type: string
      description: The type of principal
    - name: principalId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the principal
    - name: viewId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the view to retrieve
    - name: expand
      in: query
      description: Expansion tokens that request related or computed fields for the returned resource.
      required: false
      schema:
        type: array
        items:
          type: string
      style: form
      explode: false
      examples:
        include-related:
          value:
            - metadata
  responses:
    '200':
      description: View retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/View'
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '404':
      description: View not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource not found
            type: NOT_FOUND
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
