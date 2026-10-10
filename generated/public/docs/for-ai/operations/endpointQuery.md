# endpointQuery

POST `/endpoint-query`



Return a bounded page of authorized endpoints matching the shared Query expression, including endpoints shared by other owners. Read permission is evaluated before filtering, pagination and state expansion. See the request schema for supported fields and operators. Use groupId to select members of a readable room/group, then intersect type or declared interfaces to select lights. Group predicates additionally require group:read for delegated OAuth. Repeat the complete query settings and grant when following nextToken; cursors expire after fifteen minutes. Device attributes are returned only when expanded. Report per-target command acceptance and observed state separately; querying a group does not grant permission to control its members.

## Authorization

```yaml
path: /endpoint-query
runtimePath: /endpoint-query
method: POST
operationId: endpointQuery
security:
  - oauth2:
      - endpoint:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
conditionalScopes:
  groupId:
    - group:read
```

## Complete operation contract

```yaml
path: /endpoint-query
post:
  operationId: endpointQuery
  tags:
    - Endpoints
  description: >-
    Return a bounded page of authorized endpoints matching the shared Query expression, including
    endpoints shared by other owners. Read permission is evaluated before filtering, pagination and
    state expansion. See the request schema for supported fields and operators. Use groupId to
    select members of a readable room/group, then intersect type or declared interfaces to select
    lights. Group predicates additionally require group:read for delegated OAuth. Repeat the
    complete query settings and grant when following nextToken; cursors expire after fifteen
    minutes. Device attributes are returned only when expanded. Report per-target command acceptance
    and observed state separately; querying a group does not grant permission to control its
    members.
  x-portos-conditional-scopes:
    groupId:
      - group:read
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/EndpointQueryRequest.json
        example:
          query:
            match:
              key: type
              value: LIGHT
          paginationContext:
            maxResults: 10
  responses:
    '200':
      description: Endpoints retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EndpointQueryResponse.json
          example:
            results: []
    '400':
      description: Invalid query, unsupported expansion, or invalid/expired/mismatched cursor.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Bad request - missing required parameters
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Unauthorized - invalid or missing authentication token
            code: UNAUTHORIZED
            family: AUTHENTICATION
    '403':
      description: Missing conditional OAuth scope or permission to read a referenced group.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Permission to read the requested group is required.
            code: FORBIDDEN
            family: FORBIDDEN
    '404':
      description: A referenced group does not exist.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Requested group was not found.
            code: NOT_FOUND
            family: NOT_FOUND
    '409':
      description: A selected disabled endpoint cannot be forcibly refreshed.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: endpoint messaging is disabled
            code: ENDPOINT_DISABLED
            family: CONFLICT
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
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
```

## Linked components

- [EndpointQueryRequest.json](/docs/references/schemas/EndpointQueryRequest.json)
- [EndpointQueryResponse.json](/docs/references/schemas/EndpointQueryResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
