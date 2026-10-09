# getAccessControlRules

GET `/access-control-rules`



Get all access control rules.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /access-control-rules
runtimePath: /access-control-rules
method: GET
operationId: getAccessControlRules
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /access-control-rules
get:
  tags:
    - Access Control Rules
  operationId: getAccessControlRules
  description: >-
    Get all access control rules.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: owner
      in: query
      description: The owner of the access control rules to get
      required: true
      schema:
        type: string
      examples:
        check-token:
          value: ~caller
        check-id:
          value: port1/user/alice/user/alice
    - name: nextToken
      in: query
      description: The next token to get the next page of results
      required: false
      schema:
        type: string
      examples:
        next-token:
          value: '123'
    - name: maxResults
      in: query
      description: The maximum number of results to return
      required: false
      schema:
        type: integer
      examples:
        max-results:
          value: 1
    - name: expand
      in: query
      description: Expansion tokens that request related or computed fields for each result.
      required: false
      schema:
        type: array
        items:
          type: string
      style: form
      explode: false
      examples:
        include-related:
          value:
            - metadata
  responses:
    '200':
      description: Access control rules retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GetAccessControlRulesResponse'
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
            code: internal-server-error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
