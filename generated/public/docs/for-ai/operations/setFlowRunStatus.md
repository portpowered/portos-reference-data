# setFlowRunStatus

POST `/{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/set-status`

Set flow run status

Sets the status of a flow run. This is an asynchronous operation — the server accepts the request and processes the status change.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: >-
  /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/set-status
runtimePath: >-
  /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/set-status
method: POST
operationId: setFlowRunStatus
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/set-status
post:
  tags:
    - FlowRuns
  operationId: setFlowRunStatus
  summary: Set flow run status
  description: >-
    Sets the status of a flow run. This is an asynchronous operation — the server accepts the
    request and processes the status change.



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
      description: The ID of the flow that the run belongs to.
    - name: runId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the flow run to set the status of.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/SetFlowRunStatusRequest.json
        example:
          id: port1/principals/user123/resources/abc-123
  responses:
    '202':
      description: >-
        Accepted — status change request received. The flow run lifecycle will be updated
        accordingly.
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
- [SetFlowRunStatusRequest.json](/docs/references/schemas/SetFlowRunStatusRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
