# beginOAuthAuthorization

GET `/oauth/authorize`

Open user consent for a resource-bound public client

Browser entry for registered DCR or allowlisted CIMD clients. Redirects to the
sign-in and consent UI. The client must start its registered callback listener
first, generate random state and an S256 challenge, and wait for the user.
Validate callback state and iss before exchanging the code. CIMD client IDs
must match the deployment allowlist; arbitrary client metadata URLs are rejected.


## Authorization

```yaml
path: /oauth/authorize
runtimePath: /oauth/authorize
method: GET
operationId: beginOAuthAuthorization
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/authorize
get:
  operationId: beginOAuthAuthorization
  tags:
    - Auth
  security: []
  x-portos-resource-permission: false
  summary: Open user consent for a resource-bound public client
  description: |
    Browser entry for registered DCR or allowlisted CIMD clients. Redirects to the
    sign-in and consent UI. The client must start its registered callback listener
    first, generate random state and an S256 challenge, and wait for the user.
    Validate callback state and iss before exchanging the code. CIMD client IDs
    must match the deployment allowlist; arbitrary client metadata URLs are rejected.
  parameters:
    - in: query
      name: client_id
      required: true
      schema:
        type: string
    - in: query
      name: redirect_uri
      required: true
      schema:
        type: string
        format: uri
    - in: query
      name: response_type
      required: true
      schema:
        type: string
        enum:
          - code
    - in: query
      name: scope
      required: true
      schema:
        type: string
    - in: query
      name: state
      required: true
      schema:
        type: string
    - in: query
      name: resource
      required: true
      schema:
        type: string
        format: uri
      description: Canonical issuer for REST or issuer/mcp for MCP; discover rather than guess.
    - in: query
      name: code_challenge
      required: true
      schema:
        type: string
    - in: query
      name: code_challenge_method
      required: true
      schema:
        type: string
        enum:
          - S256
  responses:
    '303':
      description: Navigate to sign-in and pending consent.
      headers:
        Location:
          schema:
            type: string
            format: uri
    '400':
      description: Invalid or unsupported OAuth request.
  x-portos-delegated: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
