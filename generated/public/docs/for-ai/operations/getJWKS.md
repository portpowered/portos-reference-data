# getJWKS

GET `/.well-known/jwks.json`

JSON Web Key Set

Returns the JSON Web Key Set (JWKS) containing the public keys used to verify JWT signatures. This endpoint is publicly accessible and does not require authentication. Responses are cached for one hour.


## Authorization

```yaml
path: /.well-known/jwks.json
runtimePath: /.well-known/jwks.json
method: GET
operationId: getJWKS
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /.well-known/jwks.json
get:
  operationId: getJWKS
  tags:
    - Infrastructure
  summary: JSON Web Key Set
  description: >
    Returns the JSON Web Key Set (JWKS) containing the public keys used to verify JWT signatures.
    This endpoint is publicly accessible and does not require authentication. Responses are cached
    for one hour.
  security: []
  responses:
    '200':
      description: JWKS retrieved successfully
      content:
        application/json:
          schema:
            type: object
            properties:
              keys:
                type: array
                items:
                  type: object
                  properties:
                    kty:
                      type: string
                      description: Key type
                      example: RSA
                    alg:
                      type: string
                      description: Algorithm
                      example: RS256
                    kid:
                      type: string
                      description: Key ID
                    use:
                      type: string
                      description: Public key use
                      example: sig
                    'n':
                      type: string
                      description: RSA modulus (Base64url encoded)
                    e:
                      type: string
                      description: RSA exponent (Base64url encoded)
          example:
            key: value
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
