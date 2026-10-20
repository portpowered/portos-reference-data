# enumerateRelationships

GET `/relationships`

List relationships

Read-only enumeration of typed relationships between endpoints, routes, groups and group routes. Both vertices must be readable by the caller. Defaults to caller-owned relationships with a bounded page. Provider discovery and group membership operations manage the edges.


## Authorization

```yaml
path: /relationships
runtimePath: /relationships
method: GET
operationId: enumerateRelationships
security:
  - oauth2:
      - group:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /relationships
get:
  tags:
    - Relationships
  operationId: enumerateRelationships
  summary: List relationships
  description: >
    Read-only enumeration of typed relationships between endpoints, routes, groups and group routes.
    Both vertices must be readable by the caller. Defaults to caller-owned relationships with a
    bounded page. Provider discovery and group membership operations manage the edges.
  security:
    - oauth2:
        - group:read
    - bearerAuth: []
  parameters:
    - $ref: /docs/references/parameters/OwnerQuery.json
    - name: groupId
      in: query
      description: Relationships touching this group or a group route belonging to it.
      required: false
      schema:
        type: string
      examples:
        group:
          value: port1/principals/user123/endpoint-groups/kitchen
    - name: routeId
      in: query
      description: Only relationships with this route or group route ID as a vertex
      required: false
      schema:
        type: string
      examples:
        route:
          value: port1/principals/user123/group-routes/abc
    - name: endpointId
      in: query
      description: Relationships touching this endpoint or a route belonging to it.
      required: false
      schema:
        type: string
      examples:
        endpoint:
          value: port1/principals/user123/endpoints/robot
    - name: vertexId
      in: query
      description: Relationships touching this exact resource ID.
      required: false
      schema:
        type: string
    - name: parentId
      in: query
      description: Relationships with a route or group-route vertex belonging to this resource ID.
      required: false
      schema:
        type: string
    - name: type
      in: query
      description: Only relationships of this type.
      required: false
      schema:
        $ref: /docs/references/schemas/RelationshipType.json
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - $ref: /docs/references/parameters/MaxResultsQuery.json
    - $ref: /docs/references/parameters/ExpandQuery.json
  responses:
    '200':
      description: Relationships retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateRelationshipsResponse.json
          example:
            results:
              - id: port1/principals/user123/relationships/rel-1
                ownerId: port1/principals/user123
                type: CAN_CONTROL
                source:
                  kind: ROUTE
                  id: port1/principals/user123/routes/robot
                  parentId: port1/principals/user123/endpoints/robot
                target:
                  kind: GROUP_ROUTE
                  id: port1/principals/user123/group-routes/room-18
                  parentId: port1/principals/user123/endpoint-groups/kitchen
                interfaces:
                  - name: port1/systems/zero/capability-interfaces/robotic-vacuum-cleaner
                    version: '1.0'
                    messages:
                      - clean-room
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request - missing or invalid parameters
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

- [ExpandQuery.json](/docs/references/parameters/ExpandQuery.json)
- [MaxResultsQuery.json](/docs/references/parameters/MaxResultsQuery.json)
- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [OwnerQuery.json](/docs/references/parameters/OwnerQuery.json)
- [EnumerateRelationshipsResponse.json](/docs/references/schemas/EnumerateRelationshipsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)
- [RelationshipType.json](/docs/references/schemas/RelationshipType.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
