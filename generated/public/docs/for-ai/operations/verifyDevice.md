# verifyDevice

GET `/oauth/verify-device`

OAuth2 Verify Device by User Code

This endpoint retrieves device and client information by user_code for display on the authorization page. It is used during the OAuth 2.0 device code flow to show the user which device and client is requesting authorization.
The endpoint validates the user_code and returns client information such as client name, logo URI, Terms of Service URI, Privacy Policy URI, and the current status of the device authentication.


## Authorization

```yaml
path: /oauth/verify-device
runtimePath: /oauth/verify-device
method: GET
operationId: verifyDevice
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/verify-device
get:
  operationId: verifyDevice
  tags:
    - Internal
  summary: OAuth2 Verify Device by User Code
  description: >
    This endpoint retrieves device and client information by user_code for display on the
    authorization page. It is used during the OAuth 2.0 device code flow to show the user which
    device and client is requesting authorization.

    The endpoint validates the user_code and returns client information such as client name, logo
    URI, Terms of Service URI, Privacy Policy URI, and the current status of the device
    authentication.
  security: []
  parameters:
    - name: user_code
      in: query
      required: true
      description: User code displayed to the user for device authorization
      schema:
        type: string
        example: ABCD-EFGH
  responses:
    '200':
      description: Device and client information retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/VerifyDeviceResponse'
    '400':
      description: Invalid request (e.g., missing or invalid user_code)
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
