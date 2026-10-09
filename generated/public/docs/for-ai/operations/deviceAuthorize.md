# deviceAuthorize

POST `/auth/device_authorization`

OAuth2 Device Authorization

This API is used by your device to obtain authorization from the resource owner via a device code or QR code that your device can scan.

See the [OAuth device authorization docs for more](https://datatracker.ietf.org/doc/html/rfc8628).


Uses the existing managed-client device flow. This endpoint is public, but validates its client and supported device grant; anonymous DCR clients support authorization_code and optional refresh_token, and cannot start the device flow.

## Authorization

```yaml
path: /auth/device_authorization
runtimePath: /auth/device_authorization
method: POST
operationId: deviceAuthorize
security:
  - {}
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/device_authorization
post:
  tags:
    - Auth
  summary: OAuth2 Device Authorization
  description: >-
    This API is used by your device to obtain authorization from the resource owner via a device
    code or QR code that your device can scan.


    See the [OAuth device authorization docs for
    more](https://datatracker.ietf.org/doc/html/rfc8628).



    Uses the existing managed-client device flow. This endpoint is public, but validates its client
    and supported device grant; anonymous DCR clients support authorization_code and optional
    refresh_token, and cannot start the device flow.
  operationId: deviceAuthorize
  security:
    - {}
  requestBody:
    required: true
    content:
      application/x-www-form-urlencoded:
        schema:
          $ref: '#/components/schemas/DeviceAuthorizationRequest'
  responses:
    '200':
      description: Device authorization initiated successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/DeviceAuthorizationResponse'
    '400':
      description: Invalid request parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
