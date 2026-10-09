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
    '404':
      description: Flow run not found.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Resource not found
            code: NOT_FOUND
            family: NOT_FOUND
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
