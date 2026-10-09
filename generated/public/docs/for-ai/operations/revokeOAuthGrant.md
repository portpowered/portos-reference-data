# revokeOAuthGrant

POST `/auth/revoke`

Revoke a delegated REST or MCP grant

Possession of the matching refresh token proves revocation authority. The endpoint invalidates the grant family; it does not delete the client or other users' grants.

## Authorization

```yaml
path: /auth/revoke
runtimePath: /auth/revoke
method: POST
operationId: revokeOAuthGrant
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/revoke
post:
  operationId: revokeOAuthGrant
  tags:
    - Auth
  summary: Revoke a delegated REST or MCP grant
  security: []
  x-portos-delegated: false
  x-portos-resource-permission: false
  description: >-
    Possession of the matching refresh token proves revocation authority. The endpoint invalidates
    the grant family; it does not delete the client or other users' grants.
  requestBody:
    required: true
    content:
      application/x-www-form-urlencoded:
        schema:
          type: object
          required:
            - token
            - client_id
          properties:
            token:
              type: string
            client_id:
              type: string
        example:
          token: port1/principals/example
          client_id: dcr_example
  responses:
    '200':
      description: Grant revoked or token was already invalid.
    '400':
      description: Invalid request or client mismatch.
    '503':
      description: Revocation storage unavailable; do not claim success.
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
