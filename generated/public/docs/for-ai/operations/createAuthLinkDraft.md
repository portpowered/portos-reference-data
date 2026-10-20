# createAuthLinkDraft

POST `/auth-link-drafts`

Create an auth link draft

Creates a DRAFT auth link for a plugin authorization variant and regionalization. A draft holds the customer-owned OAuth client and provider configuration while the customer completes setup; it is not usable by endpoints until the provider connection is established. Requires the plugin-establish-link permission, evaluated with the variant and regionalization as operation context. The same Idempotency-Key and payload replays the committed response.

## Authorization

```yaml
path: /auth-link-drafts
runtimePath: /auth-link-drafts
method: POST
operationId: createAuthLinkDraft
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /auth-link-drafts
post:
  operationId: createAuthLinkDraft
  tags:
    - Auth Links
  summary: Create an auth link draft
  description: >-
    Creates a DRAFT auth link for a plugin authorization variant and regionalization. A draft holds
    the customer-owned OAuth client and provider configuration while the customer completes setup;
    it is not usable by endpoints until the provider connection is established. Requires the
    plugin-establish-link permission, evaluated with the variant and regionalization as operation
    context. The same Idempotency-Key and payload replays the committed response.
  parameters:
    - $ref: /docs/references/parameters/IdempotencyKey.json
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/CreateAuthLinkDraftRequest.json
        example:
          pluginId: port1/systems/zero/plugins/b220efd5-d59e-44cb-8ecd-57a98d4df48b
          authorizationVariantId: google-nest-customer-oauth
          regionalizationId: global
          providerConfiguration:
            nestDeviceAccess:
              projectId: example-project-id
  responses:
    '201':
      description: Draft auth link created
      headers:
        ETag:
          $ref: /docs/references/headers/ETag.json
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/AuthLink.json
          example:
            id: port1/principals/user123/auth-links/abc-123
            status: DRAFT
            associatedPluginId: port1/systems/zero/plugins/b220efd5-d59e-44cb-8ecd-57a98d4df48b
            authorizationVariantId: google-nest-customer-oauth
            regionalizationId: global
            associatedSecrets: []
            etag: '"1"'
            readiness:
              state: INCOMPLETE
              missingSecretRoles:
                - OAUTH_CLIENT
              missingConfiguration: []
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
    '409':
      description: The Idempotency-Key request is still in flight
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Conflict
            code: CONFLICT
            family: CONFLICT
    '422':
      description: The Idempotency-Key was already used with a different payload
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Idempotency-Key reused with a different payload
            code: UNPROCESSABLE_ENTITY
            family: UNPROCESSABLE_ENTITY
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [ETag.json](/docs/references/headers/ETag.json)
- [IdempotencyKey.json](/docs/references/parameters/IdempotencyKey.json)
- [AuthLink.json](/docs/references/schemas/AuthLink.json)
- [CreateAuthLinkDraftRequest.json](/docs/references/schemas/CreateAuthLinkDraftRequest.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
