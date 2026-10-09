# completeOAuthConsent

POST `/oauth/authorize`

Complete pending consent with a signed user session

The website uses this endpoint after sign-in. Agents open the authorization URL and wait for the user; they never manufacture the user session.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /oauth/authorize
runtimePath: /oauth/authorize
method: POST
operationId: completeOAuthConsent
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/authorize
post:
  operationId: completeOAuthConsent
  tags:
    - Auth
  security:
    - bearerAuth: []
  x-portos-resource-permission: false
  summary: Complete pending consent with a signed user session
  description: >-
    The website uses this endpoint after sign-in. Agents open the authorization URL and wait for the
    user; they never manufacture the user session.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - request_id
            - approved
          properties:
            request_id:
              type: string
            approved:
              type: boolean
            scope:
              type: string
  responses:
    '200':
      description: Callback navigation URL containing code or denial and original state.
      content:
        application/json:
          schema:
            type: object
            required:
              - redirect_url
            properties:
              redirect_url:
                type: string
                format: uri
    '400':
      description: Invalid
      expired or consumed request.: null
    '401':
      description: User sign-in required.
  x-portos-delegated: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
