# getAccessControlRules

GET `/access-control-rules`

Get Access Control Rules

Get access-control rules owned by the authenticated caller by default. Supplying an owner selects that owner's rules, and an ID selects one rule; results remain subject to the caller's access-control-rule-read permissions. The default page size is 10 and the maximum page size is 100.


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
    - Access control
  operationId: getAccessControlRules
  description: >-
    Get access-control rules owned by the authenticated caller by default. Supplying an owner
    selects that owner's rules, and an ID selects one rule; results remain subject to the caller's
    access-control-rule-read permissions. The default page size is 10 and the maximum page size is
    100.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: owner
      in: query
      description: >-
        Owner whose access-control rules to get. Defaults to the authenticated caller unless an ID
        is supplied. A different owner requires read permission for each returned rule.
      required: false
      schema:
        type: string
      examples:
        check-token:
          value: ~caller
        check-id:
          value: port1/user/alice/user/alice
    - name: id
      in: query
      description: >-
        Exact access-control rule identifier to retrieve. The result is included only when the
        caller has read permission.
      required: false
      schema:
        type: string
      examples:
        check-id:
          value: port1/user/alice/access-control-rules/123
    - name: operation
      in: query
      description: Exact operation to match. Only rules whose operation equals this value are returned.
      required: false
      schema:
        type: string
      examples:
        establish-link:
          value: port1/systems/zero/operations/plugin-establish-link
    - name: resource
      in: query
      description: Exact resource to match. Only rules whose resource equals this value are returned.
      required: false
      schema:
        type: string
    - name: identity
      in: query
      description: Exact identity to match. Only rules whose identity equals this value are returned.
      required: false
      schema:
        type: string
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - $ref: /docs/references/parameters/MaxResultsQuery.json
    - $ref: /docs/references/parameters/ExpandQuery.json
  responses:
    '200':
      description: Access control rules retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/GetAccessControlRulesResponse.json
          example:
            results: []
    '400':
      description: Invalid owner, ID, page size, or pagination token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: maxResults must be between 1 and 100
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Authentication is required
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: unauthorized
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
  summary: Get Access Control Rules
```

## Linked components

- [ExpandQuery.json](/docs/references/parameters/ExpandQuery.json)
- [MaxResultsQuery.json](/docs/references/parameters/MaxResultsQuery.json)
- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [Error.json](/docs/references/schemas/Error.json)
- [GetAccessControlRulesResponse.json](/docs/references/schemas/GetAccessControlRulesResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
