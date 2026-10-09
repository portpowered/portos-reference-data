# handleGitHubWebhook

POST `/webhooks/github`

Handle GitHub webhook event

Receives webhook events from GitHub. The endpoint validates the request
using HMAC-SHA256 signature verification via the X-Hub-Signature-256 header.
Supported event types include pull_request, push, create, delete,
pull_request_review, and pull_request_review_comment. Events are translated
into Port OS vcs-events messages for downstream processing.

This endpoint always returns 200 OK to prevent GitHub from retrying deliveries.


## Authorization

```yaml
path: /webhooks/github
runtimePath: /webhooks/github
method: POST
operationId: handleGitHubWebhook
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /webhooks/github
post:
  tags:
    - Webhooks
  summary: Handle GitHub webhook event
  description: |
    Receives webhook events from GitHub. The endpoint validates the request
    using HMAC-SHA256 signature verification via the X-Hub-Signature-256 header.
    Supported event types include pull_request, push, create, delete,
    pull_request_review, and pull_request_review_comment. Events are translated
    into Port OS vcs-events messages for downstream processing.

    This endpoint always returns 200 OK to prevent GitHub from retrying deliveries.
  operationId: handleGitHubWebhook
  security: []
  parameters:
    - name: X-Hub-Signature-256
      in: header
      required: true
      description: HMAC-SHA256 signature of the request body, prefixed with "sha256="
      schema:
        type: string
        example: sha256=abc123...
    - name: X-GitHub-Delivery
      in: header
      required: false
      description: Unique identifier for the webhook delivery, used for deduplication
      schema:
        type: string
        format: uuid
    - name: X-GitHub-Event
      in: header
      required: false
      description: The type of GitHub event that triggered the webhook (e.g., push, pull_request)
      schema:
        type: string
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          description: GitHub webhook event payload. The shape varies by event type.
          additionalProperties: true
        example:
          key: value
  responses:
    '200':
      description: Webhook received and processed (always returned to prevent retries)
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
    '401':
      description: Invalid HMAC signature
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
