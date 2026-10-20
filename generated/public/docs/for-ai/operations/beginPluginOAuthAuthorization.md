# beginPluginOAuthAuthorization

POST `/plugin-oauth-authorizations`

Begin plugin OAuth authorization

Starts a state-managed provider connection for the authenticated principal. Requires the plugin-establish-link permission and, for renewal, auth-link-write on the exact selected connection. The configured provider and host must support the state-managed flow. Client credentials, scope, issuer, PKCE material and principal cannot be supplied by the caller.
The attempt expires after five minutes. The exact original URL/expiry may be replayed under the same Idempotency-Key for 24 hours, even after attempt expiry. Begin with a fresh key to obtain a new attempt; replay never extends it. Current authorization and renewal eligibility are checked before replay.

## Authorization

```yaml
path: /plugin-oauth-authorizations
runtimePath: /plugin-oauth-authorizations
method: POST
operationId: beginPluginOAuthAuthorization
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugin-oauth-authorizations
post:
  operationId: beginPluginOAuthAuthorization
  tags:
    - Plugins
  summary: Begin plugin OAuth authorization
  description: >-
    Starts a state-managed provider connection for the authenticated principal. Requires the
    plugin-establish-link permission and, for renewal, auth-link-write on the exact selected
    connection. The configured provider and host must support the state-managed flow. Client
    credentials, scope, issuer, PKCE material and principal cannot be supplied by the caller.

    The attempt expires after five minutes. The exact original URL/expiry may be replayed under the
    same Idempotency-Key for 24 hours, even after attempt expiry. Begin with a fresh key to obtain a
    new attempt; replay never extends it. Current authorization and renewal eligibility are checked
    before replay.
  parameters:
    - $ref: /docs/references/parameters/IdempotencyKey.json
  security:
    - oauth2: []
    - bearerAuth: []
  x-portos-delegated: false
  x-portos-resource-permission: true
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/PluginOAuthAuthorizationRequest.json
        example:
          pluginId: port1/systems/zero/plugins/9d21576b-e2fe-4d6a-99ab-4fc969a08d53
          redirectUri: https://auth.portoperatingsystem.com/plugins
  responses:
    '200':
      description: Authorization attempt persisted; the account is not connected yet.
      headers:
        Cache-Control:
          description: Authorization responses must not be cached.
          schema:
            type: string
            enum:
              - no-store
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/PluginOAuthAuthorizationResponse.json
          example:
            authorizationUrl: >-
              https://api.sonos.com/login/v3/oauth?client_id=example&response_type=code&state=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            expiresAt: '2026-10-16T12:05:00Z'
    '400':
      description: Malformed request, unsupported configuration or missing/invalid Idempotency-Key.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: BAD_REQUEST
            code: BAD_REQUEST
            message: Authorization request is invalid; start connecting again
    '401':
      description: Authentication required.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: UNAUTHORIZED
            code: UNAUTHORIZED
            message: Sign in before connecting this provider
    '403':
      description: Current plugin or renewal permission denied.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: FORBIDDEN
            code: FORBIDDEN
            message: You do not have permission to connect this provider
    '404':
      description: Selected plugin or renewal connection no longer exists.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: NOT_FOUND
            code: NOT_FOUND
            message: The selected connection no longer exists; choose another connection
    '409':
      description: A request with the same Idempotency-Key is still in flight.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: CONFLICT
            code: IDEMPOTENCY_KEY_IN_FLIGHT
            message: >-
              Authorization is in progress or uncertain; start a new authorization if no committed
              result is available
    '422':
      description: Idempotency-Key was used with a different payload.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: UNPROCESSABLE_ENTITY
            code: IDEMPOTENCY_KEY_REUSED
            message: Idempotency-Key has a different request body; use a new key
    '500':
      description: Host authorization storage failed.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: INTERNAL_SERVER_ERROR
            code: INTERNAL
            message: Authorization could not be saved; retry with the same request key
    '503':
      description: Authorization service is unavailable.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: SERVICE_UNAVAILABLE
            code: SERVICE_UNAVAILABLE
            message: Authorization is unavailable; retry with the same request key
```

## Linked components

- [IdempotencyKey.json](/docs/references/parameters/IdempotencyKey.json)
- [Error.json](/docs/references/schemas/Error.json)
- [PluginOAuthAuthorizationRequest.json](/docs/references/schemas/PluginOAuthAuthorizationRequest.json)
- [PluginOAuthAuthorizationResponse.json](/docs/references/schemas/PluginOAuthAuthorizationResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
