# createFlowRun

POST `/{namespace}/{principalType}/{principalId}/flows/{flowId}/runs`

Create a flow run

Creates a new flow run for the specified flow.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs
runtimePath: /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs
method: POST
operationId: createFlowRun
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs
post:
  tags:
    - FlowRuns
  operationId: createFlowRun
  summary: Create a flow run
  description: >-
    Creates a new flow run for the specified flow.



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
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertFlowRunRequest'
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
            $ref: '#/components/schemas/UpsertFlowRunResponse'
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
