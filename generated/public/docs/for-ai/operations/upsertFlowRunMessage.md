# upsertFlowRunMessage

POST `/{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/messages`

Create a flow run message

Creates a message for a specific flow run. Messages can target flow nodes or flow ports.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: >-
  /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/messages
runtimePath: >-
  /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/messages
method: POST
operationId: upsertFlowRunMessage
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/messages
post:
  tags:
    - FlowRuns
  operationId: upsertFlowRunMessage
  summary: Create a flow run message
  description: >-
    Creates a message for a specific flow run. Messages can target flow nodes or flow ports.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  parameters:
    - name: namespace
      in: path
      required: true
      schema:
        type: string
      description: The namespace of the principal that the flow belongs to.
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that the flow belongs to.
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that the flow belongs to.
    - name: flowId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the flow to create a run for.
    - name: runId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the flow run to create a message for.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertFlowRunMessageRequest'
        example:
          name:
            type: PLAIN
            value: My Resource
  responses:
    '200':
      description: OK
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpsertFlowRunMessageResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Bad request — invalid request payload.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
