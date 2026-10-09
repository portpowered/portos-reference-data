# raiseAnonymousPrincipal

POST `/auth/raise`

Merge anonymous principal into real identity

Merges an anonymous principal into a real identity by exchanging an anonymous refresh token and a real identity token (e.g. Google or Apple ID token) for new access and refresh tokens bound to the real principal. All resources owned by the anonymous principal are transferred to the real identity.


## Authorization

```yaml
path: /auth/raise
runtimePath: /auth/raise
method: POST
operationId: raiseAnonymousPrincipal
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/raise
post:
  operationId: raiseAnonymousPrincipal
  tags:
    - Auth
  summary: Merge anonymous principal into real identity
  description: >
    Merges an anonymous principal into a real identity by exchanging an anonymous refresh token and
    a real identity token (e.g. Google or Apple ID token) for new access and refresh tokens bound to
    the real principal. All resources owned by the anonymous principal are transferred to the real
    identity.
  security: []
  requestBody:
    required: true
    content:
      application/x-www-form-urlencoded:
        schema:
          type: object
          required:
            - anonymous_refresh_token
            - subject_token
            - subject_token_type
          properties:
            anonymous_refresh_token:
              type: string
              description: The anonymous principal's refresh token
            subject_token:
              type: string
              description: The real identity token (Google, Apple, or Test ID token)
            subject_token_type:
              type: string
              description: |
                Token type identifier. Must be urn:ietf:params:oauth:token-type:id_token
        example:
          anonymous_refresh_token: port1/principals/example
          subject_token: port1/principals/example
          subject_token_type: port1/principals/example
  responses:
    '200':
      description: Principal raised successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GenerateTokenResponse'
          example:
            access_token: port1/principals/example
            token_type: port1/principals/example
            expires_in: 1
    '400':
      description: Invalid request (malformed form data or invalid parameters)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
          example:
            error: invalid_request
            error_description: user_code is required
    '401':
      description: Invalid grant (anonymous refresh token is not valid)
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
