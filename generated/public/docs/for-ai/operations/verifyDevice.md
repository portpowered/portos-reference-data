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
            $ref: /docs/references/schemas/VerifyDeviceResponse.json
          example:
            deviceauth_id: da_1234567890abcdef
            client_name: My OAuth Application
            client_id: port1/principals/user123/oauth-clients/my-client
            status: pending
    '400':
      description: Invalid request (e.g., missing or invalid user_code)
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/OAuthErrorResponse.json
          example:
            error: invalid_request
            error_description: user_code is required
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/OAuthErrorResponse.json
          example:
            error: invalid_request
            error_description: user_code is required
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

- [OAuthErrorResponse.json](/docs/references/schemas/OAuthErrorResponse.json)
- [VerifyDeviceResponse.json](/docs/references/schemas/VerifyDeviceResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
