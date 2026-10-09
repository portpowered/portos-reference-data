# endpointGroupsManage

POST `/endpoint-groups-manage`

Manage endpoint groups atomically

Applies a bounded list (max 20) of static endpoint group management operations (`create_group`, `delete_group`, `set_name`, `add_members`, `remove_members`, `merge_into`) atomically in one transaction. Every operation that modifies an existing group carries the group's `etag`, which is compared inside the transaction. Item outcomes are returned with HTTP 200 in a `status`/`results`/`errors` envelope correlated by `requestId`; non-200 statuses are reserved for request-level failures. `Idempotency-Key` is required unless `validateOnly` is true; a committed response is replayed for 24 hours for the same principal, key and payload. Physical control is never part of this request; use `POST /messages`.


## Authorization

```yaml
path: /endpoint-groups-manage
runtimePath: /endpoint-groups-manage
method: POST
operationId: endpointGroupsManage
security:
  - oauth2:
      - group:manage
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoint-groups-manage
post:
  operationId: endpointGroupsManage
  tags:
    - Endpoint Groups
  summary: Manage endpoint groups atomically
  description: >
    Applies a bounded list (max 20) of static endpoint group management operations (`create_group`,
    `delete_group`, `set_name`, `add_members`, `remove_members`, `merge_into`) atomically in one
    transaction. Every operation that modifies an existing group carries the group's `etag`, which
    is compared inside the transaction. Item outcomes are returned with HTTP 200 in a
    `status`/`results`/`errors` envelope correlated by `requestId`; non-200 statuses are reserved
    for request-level failures. `Idempotency-Key` is required unless `validateOnly` is true; a
    committed response is replayed for 24 hours for the same principal, key and payload. Physical
    control is never part of this request; use `POST /messages`.
  security:
    - oauth2:
        - group:manage
    - bearerAuth: []
  parameters:
    - $ref: '#/components/parameters/IdempotencyKey'
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/EndpointGroupsManageRequest'
        example:
          validateOnly: false
          operations:
            - requestId: merge-kitchen
              operation: merge_into
              sources:
                - groupId: port1/principals/user123/endpoint-groups/roborock-kitchen
                  etag: '"4"'
                - groupId: port1/principals/user123/endpoint-groups/lighting-kitchen
                  etag: '"2"'
              target:
                groupId: port1/principals/user123/endpoint-groups/kitchen
                etag: '"8"'
  responses:
    '200':
      description: >
        Batch evaluated. `status` is `committed` when every operation was applied (or would be, for
        `validateOnly`), otherwise `failed` with every failing operation in `errors` and nothing
        written.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EndpointGroupsManageResponse'
          example:
            status: committed
            results:
              - requestId: merge-kitchen
                operation: merge_into
                target:
                  groupId: port1/principals/user123/endpoint-groups/kitchen
                  etag: '"9"'
                redirects:
                  - from: port1/principals/user123/endpoint-groups/roborock-kitchen
                    to: port1/principals/user123/endpoint-groups/kitchen
                  - from: port1/principals/user123/endpoint-groups/lighting-kitchen
                    to: port1/principals/user123/endpoint-groups/kitchen
            errors: []
    '400':
      description: >-
        Malformed request, unknown operation, duplicate `requestId`, or missing
        (`IDEMPOTENCY_KEY_REQUIRED`) or over-long (`IDEMPOTENCY_KEY_INVALID`) `Idempotency-Key`
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Idempotency-Key header is required; resend the request with a unique key
            type: IDEMPOTENCY_KEY_REQUIRED
            family: REQUEST_INVALID
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
      description: Forbidden - token lacks the group:manage scope
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '409':
      description: A request with the same `Idempotency-Key` is still in flight
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: A request with this Idempotency-Key is still being processed; retry after it completes
            type: IDEMPOTENCY_KEY_IN_FLIGHT
            family: CONFLICT
    '422':
      description: The `Idempotency-Key` was already used with a different payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: This Idempotency-Key was used with a different request body; use a new key
            type: IDEMPOTENCY_KEY_REUSED
            family: UNPROCESSABLE_ENTITY
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
