# enumerateGroupRelationships

GET `/group-relationships`

List group relationships

Read-only enumeration of provider-reported relationships (`IS_PART_OF`, `CAN_CONTROL`, `LOCATED_IN`) between routes and group routes the caller is authorized to read. Relationships are managed by plugin discovery only. Optionally filter by a group, route or group route, or endpoint.


## Authorization

```yaml
path: /group-relationships
runtimePath: /group-relationships
method: GET
operationId: enumerateGroupRelationships
security:
  - oauth2:
      - group:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /group-relationships
get:
  tags:
    - Endpoint Group Routes
  operationId: enumerateGroupRelationships
  summary: List group relationships
  description: >
    Read-only enumeration of provider-reported relationships (`IS_PART_OF`, `CAN_CONTROL`,
    `LOCATED_IN`) between routes and group routes the caller is authorized to read. Relationships
    are managed by plugin discovery only. Optionally filter by a group, route or group route, or
    endpoint.
  security:
    - oauth2:
        - group:read
    - bearerAuth: []
  parameters:
    - name: owner
      in: query
      description: The owner of the relationships to get. Use '~caller' for the authenticated user
      required: true
      schema:
        type: string
      examples:
        check-token:
          value: ~caller
    - name: groupId
      in: query
      description: Only relationships with a vertex in this endpoint group (redirects are followed)
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
      description: Only relationships whose route vertex belongs to this endpoint
      required: false
      schema:
        type: string
      examples:
        endpoint:
          value: port1/principals/user123/endpoints/robot
    - name: nextToken
      in: query
      description: The next token to get the next page of results
      required: false
      schema:
        type: string
      examples:
        next-token:
          value: '123'
    - name: maxResults
      in: query
      description: The maximum number of results to return
      required: false
      schema:
        type: integer
      examples:
        max-results:
          value: 10
    - name: expand
      in: query
      description: Expansion tokens that request related or computed fields for each result.
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
      description: Group relationships retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumerateGroupRelationshipsResponse'
          example:
            results:
              - id: port1/principals/user123/group-relationships/rel-1
                ownerId: port1/principals/user123
                type: CAN_CONTROL
                source:
                  routeId: port1/principals/user123/routes/robot
                  endpointId: port1/principals/user123/endpoints/robot
                target:
                  groupRouteId: port1/principals/user123/group-routes/room-18
                  groupId: port1/principals/user123/endpoint-groups/kitchen
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
