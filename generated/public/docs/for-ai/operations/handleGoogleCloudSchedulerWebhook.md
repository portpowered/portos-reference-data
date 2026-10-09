# handleGoogleCloudSchedulerWebhook

POST `/webhooks/google-cloud-scheduler`

Handle Google Cloud Scheduler webhook

Receives scheduled job invocations from Google Cloud Scheduler.
Triggers a flow run for the specified flow and node. Authentication
is enforced by the webhook auth middleware (service account validation).

This endpoint always returns 200 OK to prevent Google Cloud Scheduler
from retrying deliveries.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /webhooks/google-cloud-scheduler
runtimePath: /webhooks/google-cloud-scheduler
method: POST
operationId: handleGoogleCloudSchedulerWebhook
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /webhooks/google-cloud-scheduler
post:
  tags:
    - Webhooks
  summary: Handle Google Cloud Scheduler webhook
  description: >-
    Receives scheduled job invocations from Google Cloud Scheduler.

    Triggers a flow run for the specified flow and node. Authentication

    is enforced by the webhook auth middleware (service account validation).


    This endpoint always returns 200 OK to prevent Google Cloud Scheduler

    from retrying deliveries.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  operationId: handleGoogleCloudSchedulerWebhook
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - flow_id
            - node_id
          properties:
            flow_id:
              type: string
              description: The Port OS identifier of the flow to trigger
            node_id:
              type: string
              description: The Port OS identifier of the flow node to execute
        example:
          flow_id: port1/principals/example
          node_id: port1/principals/example
  responses:
    '200':
      description: Webhook received and flow run triggered (always returned to prevent retries)
    '400':
      description: Invalid request payload or missing required fields
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing service account credentials
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
