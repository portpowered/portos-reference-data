# updateAuthLinkDraft

POST `/{namespace}/{principalType}/{principalId}/auth-links/{authLinkId}/update-draft`

Update an auth link draft

Updates a DRAFT auth link. Omitted fields are unchanged. The link must still be a DRAFT and the If-Match etag must match its current version; the wildcard If-Match: * is not accepted. Requires the plugin-establish-link permission, evaluated with the variant and regionalization as operation context.

## Authorization

```yaml
path: >-
  /{namespace}/{principalType}/{principalId}/auth-links/{authLinkId}/update-draft
runtimePath: >-
  /{namespace}/{principalType}/{principalId}/auth-links/{authLinkId}/update-draft
method: POST
operationId: updateAuthLinkDraft
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/auth-links/{authLinkId}/update-draft
post:
  operationId: updateAuthLinkDraft
  tags:
    - Auth Links
  summary: Update an auth link draft
  description: >-
    Updates a DRAFT auth link. Omitted fields are unchanged. The link must still be a DRAFT and the
    If-Match etag must match its current version; the wildcard If-Match: * is not accepted. Requires
    the plugin-establish-link permission, evaluated with the variant and regionalization as
    operation context.
  parameters:
    - name: namespace
      in: path
      required: true
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal
    - name: authLinkId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the auth link
    - $ref: /docs/references/parameters/IfMatch.json
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/UpdateAuthLinkDraftRequest.json
        example:
          regionalizationId: global
  responses:
    '200':
      description: Draft auth link updated
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
    '404':
      description: Auth link not found
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Resource not found
            code: NOT_FOUND
            family: NOT_FOUND
    '409':
      description: The auth link is not a DRAFT
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Conflict
            code: CONFLICT
            family: CONFLICT
    '412':
      description: The If-Match etag does not match the current auth link version; re-read the link and retry
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: auth link etag does not match; re-read the auth link and retry
            code: PRECONDITION_FAILED
            family: PRECONDITION_FAILED
    '428':
      description: >-
        The If-Match header is missing, or is the wildcard *; send the etag of the draft you last
        read
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: If-Match header is required; send the auth link etag
            code: PRECONDITION_REQUIRED
            family: PRECONDITION_REQUIRED
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [ETag.json](/docs/references/headers/ETag.json)
- [IfMatch.json](/docs/references/parameters/IfMatch.json)
- [AuthLink.json](/docs/references/schemas/AuthLink.json)
- [Error.json](/docs/references/schemas/Error.json)
- [UpdateAuthLinkDraftRequest.json](/docs/references/schemas/UpdateAuthLinkDraftRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
