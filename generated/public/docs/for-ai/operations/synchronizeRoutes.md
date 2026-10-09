# synchronizeRoutes

POST `/discovery`

Synchronize Plugin Routes via Discovery

Triggers route synchronization for a plugin. When a plugin connected to Port OS wants to report the routes available on it, it dispatches a discovery payload. The server reconciles the reported routes with its internal state. For newly persisted synchronized routes, the server can assign a backend-generated, owner-scoped Port OS route `id`; a client-supplied route `id` in the discovery payload is advisory and is not the stable lookup surface for plugin capability parity. Consumers that need to match synchronized plugin or fixture routes after enumeration should use `associatedPluginRouteId`, which preserves the plugin-owned route identity.

Every route and group-route interface must name a capability interface and exact version from the capability-interface library, its `configuration` must conform to that interface's configuration schema (an omitted configuration is validated as an empty object), and any declared attribute must exist on the interface with a value that conforms to its attribute schema. Any nonconforming item rejects the whole request with 400; `errors` lists every rejected item keyed by `pluginRouteId`. Nothing is persisted.

Group routes and relationships are keyed by plugin-owned identity within the plugin and auth link and are created or updated, never removed because they are omitted. A `pluginRouteId` must be unique across routes and group routes (`PLUGIN_ROUTE_ID_CONFLICT`). Group-route members and relationship vertices must resolve to routes or group routes of the same plugin and auth link, committed or in the same request (`UNRESOLVED_REFERENCE`). `IS_PART_OF` joins two group routes and is acyclic (`RELATIONSHIP_CYCLE`) with at most one parent per group route (`MULTIPLE_PARENTS`); `CAN_CONTROL` and `LOCATED_IN` join a route to a group route; self-edges and other shapes are `INVALID_RELATIONSHIP`. Only `CAN_CONTROL` carries `interfaces`, which must name interfaces and inbound messages the source route declares (`MESSAGE_UNSUPPORTED`). Relationship items are keyed by `relationshipExternalId`. A newly reported group route creates its own endpoint group named after it; rediscovery keeps group IDs, merges and user renames.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /discovery
runtimePath: /discovery
method: POST
operationId: synchronizeRoutes
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /discovery
post:
  tags:
    - Routes
  summary: Synchronize Plugin Routes via Discovery
  operationId: synchronizeRoutes
  description: >-
    Triggers route synchronization for a plugin. When a plugin connected to Port OS wants to report
    the routes available on it, it dispatches a discovery payload. The server reconciles the
    reported routes with its internal state. For newly persisted synchronized routes, the server can
    assign a backend-generated, owner-scoped Port OS route `id`; a client-supplied route `id` in the
    discovery payload is advisory and is not the stable lookup surface for plugin capability parity.
    Consumers that need to match synchronized plugin or fixture routes after enumeration should use
    `associatedPluginRouteId`, which preserves the plugin-owned route identity.


    Every route and group-route interface must name a capability interface and exact version from
    the capability-interface library, its `configuration` must conform to that interface's
    configuration schema (an omitted configuration is validated as an empty object), and any
    declared attribute must exist on the interface with a value that conforms to its attribute
    schema. Any nonconforming item rejects the whole request with 400; `errors` lists every rejected
    item keyed by `pluginRouteId`. Nothing is persisted.


    Group routes and relationships are keyed by plugin-owned identity within the plugin and auth
    link and are created or updated, never removed because they are omitted. A `pluginRouteId` must
    be unique across routes and group routes (`PLUGIN_ROUTE_ID_CONFLICT`). Group-route members and
    relationship vertices must resolve to routes or group routes of the same plugin and auth link,
    committed or in the same request (`UNRESOLVED_REFERENCE`). `IS_PART_OF` joins two group routes
    and is acyclic (`RELATIONSHIP_CYCLE`) with at most one parent per group route
    (`MULTIPLE_PARENTS`); `CAN_CONTROL` and `LOCATED_IN` join a route to a group route; self-edges
    and other shapes are `INVALID_RELATIONSHIP`. Only `CAN_CONTROL` carries `interfaces`, which must
    name interfaces and inbound messages the source route declares (`MESSAGE_UNSUPPORTED`).
    Relationship items are keyed by `relationshipExternalId`. A newly reported group route creates
    its own endpoint group named after it; rediscovery keeps group IDs, merges and user renames.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/SynchronizationRequest.json
        example:
          routes: []
  responses:
    '200':
      description: Routes synchronized successfully
    '400':
      description: >-
        Bad request — invalid payload, or one or more routes or group routes do not conform to the
        capability-interface library
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: >-
              discovery rejected: 1 route does not conform to the capability-interface library;
              nothing was synchronized
            code: BAD_REQUEST
            family: BAD_REQUEST
            errors:
              - pluginRouteId: robot-1
                interface: port1/systems/zero/capability-interfaces/robotic-vacuum-cleaner
                version: '1.0'
                code: INVALID_CONFIGURATION
                family: BAD_REQUEST
                status: 400
                message: >-
                  configuration for
                  port1/systems/zero/capability-interfaces/robotic-vacuum-cleaner/1.0 does not
                  conform to its schema: field 'supportsRoomCleaning': Invalid type. Expected:
                  boolean, given: string. The plugin must send configuration conforming to
                  port1/systems/zero/capability-interfaces/robotic-vacuum-cleaner/1.0.
    '401':
      description: Unauthorized — missing or invalid bearer token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [SynchronizationRequest.json](/docs/references/schemas/SynchronizationRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
