# deliverOAuthAuthorizationResponse

GET `/oauth/authorization-response`

Redirect the browser to the approved OAuth callback

Navigate the browser here using the continuation returned by authenticated
consent. The opaque reference expires after two minutes and is consumed once.
The server chooses the stored callback; caller-supplied redirect destinations
are never used. Approval carries code, original state and issuer; denial
carries access_denied, original state and issuer. No bearer token is needed.


## Authorization

```yaml
path: /oauth/authorization-response
runtimePath: /oauth/authorization-response
method: GET
operationId: deliverOAuthAuthorizationResponse
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/authorization-response
get:
  operationId: deliverOAuthAuthorizationResponse
  tags:
    - OAuth flows
  security: []
  x-portos-resource-permission: false
  x-portos-delegated: false
  summary: Redirect the browser to the approved OAuth callback
  description: |
    Navigate the browser here using the continuation returned by authenticated
    consent. The opaque reference expires after two minutes and is consumed once.
    The server chooses the stored callback; caller-supplied redirect destinations
    are never used. Approval carries code, original state and issuer; denial
    carries access_denied, original state and issuer. No bearer token is needed.
  parameters:
    - in: query
      name: request_id
      description: Opaque, single-use continuation reference returned by authenticated consent.
      required: true
      schema:
        type: string
  responses:
    '302':
      description: Navigate with GET to the exact registered callback.
      headers:
        Location:
          schema:
            type: string
            format: uri
        Cache-Control:
          schema:
            type: string
          description: no-store
        Referrer-Policy:
          schema:
            type: string
          description: no-referrer
    '400':
      description: Missing, wrong-stage, expired or consumed continuation reference.
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
