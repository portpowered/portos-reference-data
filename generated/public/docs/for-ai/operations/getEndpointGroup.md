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
          $ref: /docs/references/headers/ETag.json
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EndpointGroup.json
          example:
            id: port1/principals/example/endpoint-groups/living-room
            name:
              type: LIGHT
              value: port1/principals/example
            ownerId: port1/principals/example
            interfaces: []
            etag: '"12"'
            enablement: ENABLED
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
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
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
    '404':
      description: Endpoint group not found
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Resource not found
            code: NOT_FOUND
            family: NOT_FOUND
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  x-portos-delegated: true
  x-portos-resource-permission: true
```

## Linked components

- [ETag.json](/docs/references/headers/ETag.json)
- [EndpointGroup.json](/docs/references/schemas/EndpointGroup.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
