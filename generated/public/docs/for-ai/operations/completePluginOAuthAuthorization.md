# completePluginOAuthAuthorization

POST `/plugin-oauth-authorization-completions`

Complete plugin OAuth authorization

Completes a state-managed connection for the authenticated principal using the exact plugin, new/renewal intent and redirect from its begin request. Requires the existing plugin-auth-code-exchange permission and, for renewal, auth-link-write on the selected connection. Current eligibility is checked before replaying a committed response.
One transaction consumes state and commits an exchange-started fence before contacting the provider. Credential/connection installation and the nonsecret completion receipt then commit together. A successful response means that installation committed; it does not prove device discovery or playback.
Retry a transport failure with the same complete payload and Idempotency-Key. A committed result is replayed for 24 hours. An exchange-started or uncertain result returns 409 and cannot be repaired by another key or token exchange; start a fresh authorization instead. Vendor failure never rearms consumed state. Callback code and state must not be logged or placed in URL paths.

## Authorization

```yaml
path: /plugin-oauth-authorization-completions
runtimePath: /plugin-oauth-authorization-completions
method: POST
operationId: completePluginOAuthAuthorization
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugin-oauth-authorization-completions
post:
  operationId: completePluginOAuthAuthorization
  tags:
    - Plugins
  summary: Complete plugin OAuth authorization
  description: >-
    Completes a state-managed connection for the authenticated principal using the exact plugin,
    new/renewal intent and redirect from its begin request. Requires the existing
    plugin-auth-code-exchange permission and, for renewal, auth-link-write on the selected
    connection. Current eligibility is checked before replaying a committed response.

    One transaction consumes state and commits an exchange-started fence before contacting the
    provider. Credential/connection installation and the nonsecret completion receipt then commit
    together. A successful response means that installation committed; it does not prove device
    discovery or playback.

    Retry a transport failure with the same complete payload and Idempotency-Key. A committed result
    is replayed for 24 hours. An exchange-started or uncertain result returns 409 and cannot be
    repaired by another key or token exchange; start a fresh authorization instead. Vendor failure
    never rearms consumed state. Callback code and state must not be logged or placed in URL paths.
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
          $ref: /docs/references/schemas/PluginOAuthCompletionRequest.json
        example:
          pluginId: port1/systems/zero/plugins/9d21576b-e2fe-4d6a-99ab-4fc969a08d53
          redirectUri: https://auth.portoperatingsystem.com/plugins
          code: provider-code-example
          state: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  responses:
    '200':
      description: Connection installation committed, or its committed response was replayed.
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
            $ref: /docs/references/schemas/PluginOAuthCompletionResponse.json
          example:
            authLinkId: port1/principals/example/auth-links/installed-connection
    '400':
      description: Malformed request, invalid/expired state or missing/invalid Idempotency-Key.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: BAD_REQUEST
            code: BAD_REQUEST
            message: Authorization request is invalid; start connecting again
    '401':
      description: Authentication required or provider authorization credentials rejected.
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
      description: An exchange is in progress or uncertain; do not exchange again.
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
    '429':
      description: Provider authorization is rate limited.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: TOO_MANY_REQUESTS
            code: TOO_MANY_REQUESTS
            message: Provider authorization is rate limited; try again later
    '500':
      description: Host storage or installation failed; retry with the same request key.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: INTERNAL_SERVER_ERROR
            code: INTERNAL
            message: Authorization could not be saved; retry with the same request key
    '502':
      description: Provider returned an invalid authorization response.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: PROVIDER_BAD_RESPONSE
            code: INVALID_PROVIDER_RESPONSE
            message: Provider authorization returned an invalid response; start connecting again
    '503':
      description: Provider or authorization service is unavailable.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: SERVICE_UNAVAILABLE
            code: SERVICE_UNAVAILABLE
            message: Authorization is unavailable; retry with the same request key
    '504':
      description: Provider authorization timed out; start a fresh authorization.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: PROVIDER_TIMEOUT
            code: PROVIDER_TIMEOUT
            message: Provider authorization timed out; start a fresh authorization
```

## Linked components

- [IdempotencyKey.json](/docs/references/parameters/IdempotencyKey.json)
- [Error.json](/docs/references/schemas/Error.json)
- [PluginOAuthCompletionRequest.json](/docs/references/schemas/PluginOAuthCompletionRequest.json)
- [PluginOAuthCompletionResponse.json](/docs/references/schemas/PluginOAuthCompletionResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
