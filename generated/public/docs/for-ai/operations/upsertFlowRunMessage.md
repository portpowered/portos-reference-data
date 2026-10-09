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
          $ref: /docs/references/schemas/UpsertFlowRunMessageRequest.json
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
            $ref: /docs/references/schemas/UpsertFlowRunMessageResponse.json
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Bad request — invalid request payload.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [UpsertFlowRunMessageRequest.json](/docs/references/schemas/UpsertFlowRunMessageRequest.json)
- [UpsertFlowRunMessageResponse.json](/docs/references/schemas/UpsertFlowRunMessageResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
