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
        example:
          accessCode: port1/principals/example
          clientId: port1/principals/example
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
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '500':
      description: Internal server error — Tuya API unavailable
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
