# getPendingOAuthConsent

GET `/oauth/authorization-request`

Read a pending request for the signed-in consent page

Returns server-stored consent details to the authenticated website. Descriptive
client metadata is unverified. Agents use the public authorization endpoint and
wait for the user; a delegated device token cannot read this session-only endpoint.


## Authorization

```yaml
path: /oauth/authorization-request
runtimePath: /oauth/authorization-request
method: GET
operationId: getPendingOAuthConsent
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/authorization-request
get:
  operationId: getPendingOAuthConsent
  tags:
    - Auth
  summary: Read a pending request for the signed-in consent page
  description: |
    Returns server-stored consent details to the authenticated website. Descriptive
    client metadata is unverified. Agents use the public authorization endpoint and
    wait for the user; a delegated device token cannot read this session-only endpoint.
  security:
    - bearerAuth: []
  x-portos-delegated: false
  x-portos-resource-permission: false
  parameters:
    - in: query
      name: request_id
      required: true
      schema:
        type: string
  responses:
    '200':
      description: Pending consent details. Response is not cacheable.
      content:
        application/json:
          schema:
            type: object
            required:
              - client_id
              - client_name
              - redirect_uri
              - resource
              - scopes
            properties:
              client_id:
                type: string
              client_name:
                type: string
              redirect_uri:
                type: string
                format: uri
              resource:
                type: string
                format: uri
              scopes:
                type: array
                items:
                  type: string
          example:
            client_id: dcr_example
            client_name: Example agent
            redirect_uri: http://127.0.0.1:8765/callback
            resource: https://portos-pilot-api-685761720421.us-west1.run.app
            scopes: []
    '400':
      description: Invalid, expired or consumed request.
    '401':
      description: User sign-in required.
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
