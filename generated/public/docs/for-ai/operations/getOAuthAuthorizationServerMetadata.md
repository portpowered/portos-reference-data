# getOAuthAuthorizationServerMetadata

GET `/.well-known/oauth-authorization-server`

Discover OAuth and DCR endpoints

Discover the canonical issuer and endpoints for the deployed environment. Public REST grants use issuer as resource; MCP grants use issuer/mcp. CIMD client IDs must be public HTTPS metadata URLs. Registration is anonymous; device access requires user consent.

## Authorization

```yaml
path: /.well-known/oauth-authorization-server
runtimePath: /.well-known/oauth-authorization-server
method: GET
operationId: getOAuthAuthorizationServerMetadata
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /.well-known/oauth-authorization-server
get:
  operationId: getOAuthAuthorizationServerMetadata
  tags:
    - OAuth flows
  summary: Discover OAuth and DCR endpoints
  security: []
  x-portos-delegated: false
  x-portos-resource-permission: false
  description: >-
    Discover the canonical issuer and endpoints for the deployed environment. Public REST grants use
    issuer as resource; MCP grants use issuer/mcp. CIMD client IDs must be public HTTPS metadata
    URLs. Registration is anonymous; device access requires user consent.
  responses:
    '200':
      description: Authorization server metadata.
      content:
        application/json:
          schema:
            type: object
            required:
              - issuer
              - authorization_endpoint
              - token_endpoint
              - revocation_endpoint
              - scopes_supported
            properties:
              issuer:
                type: string
                format: uri
              authorization_endpoint:
                type: string
                format: uri
              token_endpoint:
                type: string
                format: uri
              registration_endpoint:
                type: string
                format: uri
                description: Advertised when new anonymous registration is enabled; omitted when disabled.
              revocation_endpoint:
                type: string
                format: uri
              jwks_uri:
                type: string
                format: uri
              scopes_supported:
                type: array
                items:
                  type: string
              code_challenge_methods_supported:
                type: array
                items:
                  type: string
                  enum:
                    - S256
              token_endpoint_auth_methods_supported:
                type: array
                items:
                  type: string
              client_id_metadata_document_supported:
                type: boolean
              authorization_response_iss_parameter_supported:
                type: boolean
          example:
            issuer: https://auth.portoperatingsystem.com
            authorization_endpoint: https://auth.portoperatingsystem.com/oauth/authorize
            token_endpoint: https://auth.portoperatingsystem.com/auth/token
            revocation_endpoint: https://auth.portoperatingsystem.com/auth/revoke
            scopes_supported:
              - endpoint:read
              - message:send
            registration_endpoint: https://auth.portoperatingsystem.com/oauth/register
            jwks_uri: https://auth.portoperatingsystem.com/.well-known/jwks.json
            code_challenge_methods_supported:
              - S256
            token_endpoint_auth_methods_supported:
              - none
            client_id_metadata_document_supported: true
            authorization_response_iss_parameter_supported: true
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
