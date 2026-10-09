# enumerateEndpointGroups

GET `/endpoint-groups`

List endpoint groups

Lists all available endpoint groups for the authenticated user

## Authorization

```yaml
path: /endpoint-groups
runtimePath: /endpoint-groups
method: GET
operationId: enumerateEndpointGroups
security:
  - oauth2:
      - group:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoint-groups
get:
  operationId: enumerateEndpointGroups
  tags:
    - Endpoint Groups
  summary: List endpoint groups
  description: Lists all available endpoint groups for the authenticated user
  security:
    - oauth2:
        - group:read
    - bearerAuth: []
  parameters:
    - name: enablement
      in: query
      description: >-
        Collection visibility. Defaults to ENABLED. Use '*' to include all authorized groups, or
        DISABLED to list hidden groups. Exact id reads ignore this filter; disabled groups still
        cannot be targeted by messages.
      schema:
        type: string
        enum:
          - ENABLED
          - DISABLED
          - '*'
    - name: owner
      in: query
      description: >-
        The owner of the endpoint groups to get. Use '~caller' to get endpoint groups for the
        authenticated user
      required: true
      schema:
        type: string
      examples:
        check-token:
          value: ~caller
        check-id:
          value: port1/user/alice/user/alice
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
      description: >-
        Expansion tokens that request related or computed fields for each result. Use
        `interfaces.attributes` to populate each group's `attributes` array with the stored values
        of its group routes.
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
      description: Endpoint groups retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateEndpointGroupsResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request - missing required parameters
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

- [EnumerateEndpointGroupsResponse.json](/docs/references/schemas/EnumerateEndpointGroupsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
