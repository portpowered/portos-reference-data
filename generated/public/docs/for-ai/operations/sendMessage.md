# sendMessage

POST `/messages`



Sends a message to a recipient.

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
path: /messages
runtimePath: /messages
method: POST
operationId: sendMessage
security:
  - oauth2:
      - message:send
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /messages
post:
  operationId: sendMessage
  tags:
    - Messages
  description: >
    Sends a message to a recipient.


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
          $ref: '#/components/schemas/CreateMessageRequest'
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
            $ref: '#/components/schemas/CreateMessageResponse'
          example:
            messageId: example-dispatch-id
    '400':
      description: Invalid request payload or plugin dispatch request error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: INVALID_VALUE
            family: REQUEST_INVALID
            code: provider-invalid-speed
            message: Fan speed must be one of the supported values.
            details:
              parameter: speed
              actual: storm
    '401':
      description: Plugin authorization credential is invalid or expired
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: AUTHORIZATION_CREDENTIAL_EXPIRED
            family: AUTHENTICATION
            code: provider-token-expired
            message: The provider authorization has expired. Re-link the plugin.
    '403':
      description: Plugin provider denied the requested operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: INSUFFICIENT_PERMISSIONS
            family: PERMISSION
            code: provider-scope-missing
            message: The linked account does not grant permission for this device.
    '404':
      description: Target endpoint or plugin route was not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: NOT_FOUND
            family: NOT_FOUND
            code: message-not-found
            message: The linked account does not grant permission for this device.
    '409':
      description: Endpoint state conflicts with the requested message
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: NOT_SUPPORTED_IN_CURRENT_MODE
            family: ENDPOINT_STATE_CONFLICT
            code: device-mode-conflict
            message: The command is not supported while the endpoint is in eco mode.
            details:
              currentMode: eco
    '422':
      description: Plugin rejected a semantically invalid message value
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: VALUE_OUT_OF_RANGE
            family: REQUEST_INVALID
            code: brightness-out-of-range
            message: Brightness must be between 1 and 100.
            details:
              parameter: brightness
              minimum: 1
              maximum: 100
              actual: '150'
    '423':
      description: Endpoint is unavailable, unreachable, locked, or low power
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: ENDPOINT_UNREACHABLE
            family: ENDPOINT_UNAVAILABLE
            code: device-offline
            message: The device is not reachable.
            details:
              pluginId: port1.plugin.hue
              pluginRouteId: hue-device-42
    '429':
      description: Plugin provider rate limit exceeded
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: RATE_LIMIT_EXCEEDED
            family: RATE_LIMIT
            code: provider-rate-limit
            message: The provider rate limit was exceeded.
            details:
              retryAfterSeconds: 60
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
            code: internal-server-error
            message: The server failed
    '502':
      description: Plugin provider returned an invalid or internal error response
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: PROVIDER_INTERNAL_ERROR
            family: PROVIDER_BAD_RESPONSE
            code: provider-internal-error
            message: The provider failed while handling the command.
    '503':
      description: Plugin provider or bridge is unavailable
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: PROVIDER_SERVICE_UNAVAILABLE
            family: PROVIDER_UNAVAILABLE
            code: vendor-outage
            message: The provider service is temporarily unavailable.
    '504':
      description: Plugin provider timed out
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: PROVIDER_TIMEOUT
            family: PROVIDER_TIMEOUT
            code: provider-timeout
            message: The provider did not respond before the timeout.
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - message:send
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
