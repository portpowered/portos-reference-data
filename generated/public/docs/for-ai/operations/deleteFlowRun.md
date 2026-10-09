# deleteFlowRun

DELETE `/{namespace}/{principalType}/{principalId}/flow-runs/{runId}`

Delete a flow run

Deletes a specific flow run by its ID. The run ID is combined with the principal namespace prefix to construct the full flow run identifier.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/flow-runs/{runId}
runtimePath: /{namespace}/{principalType}/{principalId}/flow-runs/{runId}
method: DELETE
operationId: deleteFlowRun
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/flow-runs/{runId}
delete:
  tags:
    - FlowRuns
  operationId: deleteFlowRun
  summary: Delete a flow run
  description: >-
    Deletes a specific flow run by its ID. The run ID is combined with the principal namespace
    prefix to construct the full flow run identifier.



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
      description: The namespace of the principal that the flow run belongs to.
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that the flow run belongs to.
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that the flow run belongs to.
    - name: runId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the flow run to delete.
  responses:
    '200':
      description: Flow run deleted successfully.
    '400':
      description: Bad request — missing or invalid parameters.
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
    '404':
      description: Flow run not found.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource not found
            type: NOT_FOUND
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
