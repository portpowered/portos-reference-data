# getEndpointGroup

GET `/{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}`

Get an endpoint group

Get an endpoint group by ID.


## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}
runtimePath: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}
method: GET
operationId: getEndpointGroup
security:
  - oauth2:
      - group:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}
get:
  tags:
    - Endpoint Groups
  operationId: getEndpointGroup
  summary: Get an endpoint group
  description: |
    Get an endpoint group by ID.
  security:
    - oauth2:
        - group:read
    - bearerAuth: []
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
    - name: groupId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the endpoint group to retrieve
    - name: expand
      in: query
      description: >-
        Expansion tokens that request related or computed fields for the returned resource. Use
        `interfaces.attributes` to populate the group's `attributes` array with the stored values of
        its group routes.
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
        group-route-state:
          value:
            - interfaces.attributes
    - name: forceDeviceAttributeQuery
      in: query
      description: >-
        Asks each provider for fresh values of the group routes before the response is returned.
        Only applied when `expand` includes `interfaces.attributes`. Absent, invalid or `false`
        values return the stored values.
      required: false
      schema:
        type: boolean
      examples:
        forced-deep-query:
          value: true
  responses:
    '200':
      description: Endpoint group retrieved successfully
      headers:
        ETag:
          $ref: '#/components/headers/ETag'
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EndpointGroup'
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '404':
      description: Endpoint group not found
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
  x-portos-delegated: true
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
