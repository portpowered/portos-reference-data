# getAccessControlRuleAudit

GET `/access-control-rules/audit`

Get Access Control Rule Audit

Read the audit of access-control rule changes, newest first. Every rule upsert and delete records who made it, through which client, why, and under which request, plus the rule as it was written. Entries hold identifiers and the rule's shape only, never token text. Entries older than the configured retention (`auth.audit.retentionDays`, default 365) are pruned at server start.


Only operator callers (operational tokens) and system zero may read the audit; any other caller receives 403. The default page size is 50 and the maximum is 200.

## Authorization

```yaml
path: /access-control-rules/audit
runtimePath: /access-control-rules/audit
method: GET
operationId: getAccessControlRuleAudit
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /access-control-rules/audit
get:
  tags:
    - Access control
  operationId: getAccessControlRuleAudit
  description: >-
    Read the audit of access-control rule changes, newest first. Every rule upsert and delete
    records who made it, through which client, why, and under which request, plus the rule as it was
    written. Entries hold identifiers and the rule's shape only, never token text. Entries older
    than the configured retention (`auth.audit.retentionDays`, default 365) are pruned at server
    start.



    Only operator callers (operational tokens) and system zero may read the audit; any other caller
    receives 403. The default page size is 50 and the maximum is 200.
  parameters:
    - name: ruleId
      in: query
      description: Only entries about this access-control rule.
      required: false
      schema:
        type: string
      example: port1/systems/zero/access-control-rules/operator-grants-customer-oauth
    - name: actorPrincipal
      in: query
      description: Only entries made by this principal.
      required: false
      schema:
        type: string
    - name: resource
      in: query
      description: Exact resource of the audited rule.
      required: false
      schema:
        type: string
    - name: operation
      in: query
      description: Exact operation of the audited rule.
      required: false
      schema:
        type: string
    - name: since
      in: query
      description: Only entries recorded at or after this time (RFC 3339).
      required: false
      schema:
        type: string
        format: date-time
    - name: until
      in: query
      description: Only entries recorded before this time (RFC 3339).
      required: false
      schema:
        type: string
        format: date-time
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - name: maxResults
      in: query
      required: false
      description: >-
        Maximum number of entries to return in one page. Defaults to 50. Values from 1 through 200
        are accepted.
      schema:
        type: integer
        minimum: 1
        maximum: 200
        default: 50
  responses:
    '200':
      description: Audit entries retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/GetAccessControlRuleAuditResponse.json
          example:
            results: []
    '400':
      description: Invalid filter, page size, time or pagination token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: maxResults must be between 1 and 200
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
    '403':
      description: The caller is not an operator
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: only operators may read the access control rule audit
            code: FORBIDDEN
            family: FORBIDDEN
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
  x-portos-resource-permission: false
  security:
    - oauth2: []
    - bearerAuth: []
  summary: Get Access Control Rule Audit
```

## Linked components

- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [Error.json](/docs/references/schemas/Error.json)
- [GetAccessControlRuleAuditResponse.json](/docs/references/schemas/GetAccessControlRuleAuditResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
