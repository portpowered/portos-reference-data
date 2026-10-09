# generateTuyaQrCode

POST `/tuya/qrcode`

Generate Tuya QR Code

Generates a QR code for Tuya smart home device authentication. The QR code can be scanned by the Tuya Smart app to link a Tuya account. Requires a valid Tuya client ID and access code obtained from the Tuya IoT platform.


## Authorization

```yaml
path: /tuya/qrcode
runtimePath: /tuya/qrcode
method: POST
operationId: generateTuyaQrCode
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /tuya/qrcode
post:
  tags:
    - Tuya
  summary: Generate Tuya QR Code
  operationId: generateTuyaQrCode
  description: >
    Generates a QR code for Tuya smart home device authentication. The QR code can be scanned by the
    Tuya Smart app to link a Tuya account. Requires a valid Tuya client ID and access code obtained
    from the Tuya IoT platform.
  security: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - accessCode
            - clientId
          properties:
            accessCode:
              type: string
              description: Access code obtained from the Tuya IoT platform
            schema:
              type: string
              description: Optional Tuya app schema identifier
            clientId:
              type: string
              description: Tuya IoT platform client ID
            authenticationUrl:
              type: string
              description: >
                Optional override for the Tuya authentication API endpoint. Defaults to
                https://apigw.iotbing.com if not provided.
  responses:
    '200':
      description: QR code generated successfully
      content:
        application/json:
          schema:
            type: object
            properties:
              code:
                type: string
                description: Raw QR code token
              qrFormattedCode:
                type: string
                description: >
                  Formatted QR code string suitable for rendering as a QR image (e.g.,
                  tuyaSmart--qrLogin?token={code})
          example:
            key: value
    '400':
      description: Bad request — missing required fields or invalid payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '500':
      description: Internal server error — Tuya API unavailable
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
