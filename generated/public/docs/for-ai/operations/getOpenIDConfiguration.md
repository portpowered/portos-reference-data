# getOpenIDConfiguration

GET `/.well-known/openid-configuration`

OpenID Connect discovery

Returns the OpenID Connect discovery document as defined by the OpenID Connect Discovery 1.0 specification. This endpoint is publicly accessible and does not require authentication.


## Authorization

```yaml
path: /.well-known/openid-configuration
runtimePath: /.well-known/openid-configuration
method: GET
operationId: getOpenIDConfiguration
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /.well-known/openid-configuration
get:
  operationId: getOpenIDConfiguration
  tags:
    - Infrastructure
  summary: OpenID Connect discovery
  description: >
    Returns the OpenID Connect discovery document as defined by the OpenID Connect Discovery 1.0
    specification. This endpoint is publicly accessible and does not require authentication.
  security: []
  responses:
    '200':
      description: OpenID Connect configuration retrieved successfully
      content:
        application/json:
          schema:
            type: object
            properties:
              issuer:
                type: string
                description: The issuer identifier
                example: https://portpowered.com
              jwks_uri:
                type: string
                description: URL of the JSON Web Key Set document
                example: https://portpowered.com/.well-known/jwks.json
              token_endpoint:
                type: string
                description: URL of the token endpoint
                example: https://portpowered.com/auth/token
              response_types_supported:
                type: array
                items:
                  type: string
                example:
                  - code
              subject_types_supported:
                type: array
                items:
                  type: string
                example:
                  - public
              id_token_signing_alg_values_supported:
                type: array
                items:
                  type: string
                example:
                  - RS256
              grant_types_supported:
                type: array
                items:
                  type: string
                example:
                  - authorization_code
                  - client_credentials
                  - refresh_token
                  - urn:ietf:params:oauth:grant-type:token-exchange
                  - urn:ietf:params:oauth:grant-type:device_code
          example:
            issuer: https://portos-pilot-api-685761720421.us-west1.run.app
            jwks_uri: https://portos-pilot-api-685761720421.us-west1.run.app/.well-known/jwks.json
            token_endpoint: https://portos-pilot-api-685761720421.us-west1.run.app/auth/token
            response_types_supported:
              - code
            subject_types_supported:
              - public
            id_token_signing_alg_values_supported:
              - RS256
            grant_types_supported:
              - authorization_code
              - refresh_token
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
