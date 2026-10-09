# sendMessageLegacyAlias

POST `/messages/send`



Compatibility alias for POST /messages. Sends a message to a recipient.

Plugin-originated dispatch errors use the canonical plugin dispatch error
contract: `type`, `family`, `code`, `message`, and optional typed `details`.
Fire-and-forget requests can only return plugin errors detected before the
request is accepted. Synchronous requests can also map a correlated
`portos/errorResponse` plugin response into the HTTP error statuses below.

Plugin dispatch error status mapping:

| Plugin error family | Representative types | HTTP status |
| --- | --- | --- |
| `REQUEST_INVALID` | `INVALID_DIRECTIVE`, `INVALID_VALUE` | `400` |
| `REQUEST_INVALID` | `VALUE_OUT_OF_RANGE` | `422` |
| `AUTHENTICATION` | `AUTHORIZATION_CREDENTIAL_INVALID`, `AUTHORIZATION_CREDENTIAL_EXPIRED` | `401` |
| `PERMISSION` | `INSUFFICIENT_PERMISSIONS`, `CLOUD_CONTROL_DISABLED` | `403` |
| `ENDPOINT_NOT_FOUND` | no such endpoint or route | `404` |
| `ENDPOINT_STATE_CONFLICT` | `ENDPOINT_BUSY`, `NOT_SUPPORTED_IN_CURRENT_MODE` | `409` |
| `ENDPOINT_UNAVAILABLE` | `ENDPOINT_UNREACHABLE`, `ENDPOINT_LOW_POWER` | `423` |
| `RATE_LIMIT` | `RATE_LIMIT_EXCEEDED` | `429` |
| `PROVIDER_BAD_RESPONSE` | `PROVIDER_INTERNAL_ERROR` | `502` |
| `PROVIDER_UNAVAILABLE` | `BRIDGE_UNREACHABLE`, `PROVIDER_SERVICE_UNAVAILABLE` | `503` |
| `PROVIDER_TIMEOUT` | `PROVIDER_TIMEOUT` | `504` |


## Authorization

```yaml
path: /messages/send
runtimePath: /messages/send
method: POST
operationId: sendMessageLegacyAlias
security:
  - oauth2:
      - message:send
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /messages/send
post:
  operationId: sendMessageLegacyAlias
  tags:
    - Messages
  description: >
    Compatibility alias for POST /messages. Sends a message to a recipient.


    Plugin-originated dispatch errors use the canonical plugin dispatch error

    contract: `type`, `family`, `code`, `message`, and optional typed `details`.

    Fire-and-forget requests can only return plugin errors detected before the

    request is accepted. Synchronous requests can also map a correlated

    `portos/errorResponse` plugin response into the HTTP error statuses below.


    Plugin dispatch error status mapping:


    | Plugin error family | Representative types | HTTP status |

    | --- | --- | --- |

    | `REQUEST_INVALID` | `INVALID_DIRECTIVE`, `INVALID_VALUE` | `400` |

    | `REQUEST_INVALID` | `VALUE_OUT_OF_RANGE` | `422` |

    | `AUTHENTICATION` | `AUTHORIZATION_CREDENTIAL_INVALID`, `AUTHORIZATION_CREDENTIAL_EXPIRED` |
    `401` |

    | `PERMISSION` | `INSUFFICIENT_PERMISSIONS`, `CLOUD_CONTROL_DISABLED` | `403` |

    | `ENDPOINT_NOT_FOUND` | no such endpoint or route | `404` |

    | `ENDPOINT_STATE_CONFLICT` | `ENDPOINT_BUSY`, `NOT_SUPPORTED_IN_CURRENT_MODE` | `409` |

    | `ENDPOINT_UNAVAILABLE` | `ENDPOINT_UNREACHABLE`, `ENDPOINT_LOW_POWER` | `423` |

    | `RATE_LIMIT` | `RATE_LIMIT_EXCEEDED` | `429` |

    | `PROVIDER_BAD_RESPONSE` | `PROVIDER_INTERNAL_ERROR` | `502` |

    | `PROVIDER_UNAVAILABLE` | `BRIDGE_UNREACHABLE`, `PROVIDER_SERVICE_UNAVAILABLE` | `503` |

    | `PROVIDER_TIMEOUT` | `PROVIDER_TIMEOUT` | `504` |
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/CreateMessageRequest.json
        example:
          target:
            type: ENDPOINT
            id: port1/principals/example/endpoints/example-light
          message:
            header:
              namespace: port1/systems/zero/capability-interfaces/power
              name: turn-on
              version: '1.0'
            body: {}
  responses:
    '200':
      description: Message sent successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/CreateMessageResponse.json
          example:
            messageId: example-dispatch-id
    '400':
      description: Invalid request payload or plugin dispatch request error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: REQUEST_INVALID
            code: INVALID_VALUE
            message: Fan speed must be one of the supported values.
            details:
              parameter: speed
              actual: storm
              providerCode: provider-invalid-speed
    '401':
      description: Plugin authorization credential is invalid or expired
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: AUTHENTICATION
            code: AUTHORIZATION_CREDENTIAL_EXPIRED
            message: The provider authorization has expired. Re-link the plugin.
            details:
              providerCode: provider-token-expired
    '403':
      description: Plugin provider denied the requested operation
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: PERMISSION
            code: INSUFFICIENT_PERMISSIONS
            message: The linked account does not grant permission for this device.
            details:
              providerCode: provider-scope-missing
    '404':
      description: Target endpoint or plugin route was not found
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: NOT_FOUND
            code: NOT_FOUND
            message: The linked account does not grant permission for this device.
            details:
              providerCode: message-not-found
    '409':
      description: Endpoint state conflicts with the requested message
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: ENDPOINT_STATE_CONFLICT
            code: NOT_SUPPORTED_IN_CURRENT_MODE
            message: The command is not supported while the endpoint is in eco mode.
            details:
              currentMode: eco
              providerCode: device-mode-conflict
    '422':
      description: Plugin rejected a semantically invalid message value
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: REQUEST_INVALID
            code: VALUE_OUT_OF_RANGE
            message: Brightness must be between 1 and 100.
            details:
              parameter: brightness
              minimum: 1
              maximum: 100
              actual: '150'
              providerCode: brightness-out-of-range
    '423':
      description: Endpoint is unavailable, unreachable, locked, or low power
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: ENDPOINT_UNAVAILABLE
            code: ENDPOINT_UNREACHABLE
            message: The device is not reachable.
            details:
              pluginId: port1.plugin.hue
              pluginRouteId: hue-device-42
              providerCode: device-offline
    '429':
      description: Plugin provider rate limit exceeded
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: RATE_LIMIT
            code: RATE_LIMIT_EXCEEDED
            message: The provider rate limit was exceeded.
            details:
              retryAfterSeconds: 60
              providerCode: provider-rate-limit
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: INTERNAL_SERVER_ERROR
            code: INTERNAL
            message: The server failed
            details:
              providerCode: internal-server-error
    '502':
      description: Plugin provider returned an invalid or internal error response
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: PROVIDER_BAD_RESPONSE
            code: PROVIDER_INTERNAL_ERROR
            message: The provider failed while handling the command.
            details:
              providerCode: provider-internal-error
    '503':
      description: Plugin provider or bridge is unavailable
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: PROVIDER_UNAVAILABLE
            code: PROVIDER_SERVICE_UNAVAILABLE
            message: The provider service is temporarily unavailable.
            details:
              providerCode: vendor-outage
    '504':
      description: Plugin provider timed out
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            family: PROVIDER_TIMEOUT
            code: PROVIDER_TIMEOUT
            message: The provider did not respond before the timeout.
            details:
              providerCode: provider-timeout
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - message:send
    - bearerAuth: []
```

## Linked components

- [CreateMessageRequest.json](/docs/references/schemas/CreateMessageRequest.json)
- [CreateMessageResponse.json](/docs/references/schemas/CreateMessageResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
