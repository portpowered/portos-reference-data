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
  responses:
    '200':
      description: Webhook received and flow run triggered (always returned to prevent retries)
    '400':
      description: Invalid request payload or missing required fields
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing service account credentials
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
