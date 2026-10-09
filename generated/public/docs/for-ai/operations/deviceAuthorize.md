# deviceAuthorize

POST `/auth/device-authorization`

OAuth2 Device Authorization

This API is used by your device to obtain authorization from the resource owner via a device code or QR code that your device can scan.

See the [OAuth device authorization docs for more](https://datatracker.ietf.org/doc/html/rfc8628).


Uses the existing managed-client device flow. This endpoint is public, but validates its client and supported device grant; anonymous DCR clients support authorization_code and optional refresh_token, and cannot start the device flow. The legacy /auth/device_authorization path remains a compatibility alias.

## Authorization

```yaml
path: /auth/device-authorization
runtimePath: /auth/device-authorization
method: POST
operationId: deviceAuthorize
security:
  - {}
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/device-authorization
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
    refresh_token, and cannot start the device flow. The legacy /auth/device_authorization path
    remains a compatibility alias.
  operationId: deviceAuthorize
  security:
    - {}
  requestBody:
    required: true
    content:
      application/x-www-form-urlencoded:
        schema:
          $ref: '#/components/schemas/DeviceAuthorizationRequest'
        example:
          client_id: dcr_example
  responses:
    '200':
      description: Device authorization initiated successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/DeviceAuthorizationResponse'
          example:
            device_code: port1/principals/example
            user_code: port1/principals/example
            verification_uri: https://portpowered.com/oauth/device/verify
            expires_in: 1800
            interval: 5
    '400':
      description: Invalid request parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
          example:
            error: invalid_request
            error_description: user_code is required
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
          example:
            error: invalid_request
            error_description: user_code is required
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
