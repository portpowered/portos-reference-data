# enumeratePrincipals

GET `/principals`

Enumerate Principals

Lists principals owned by the authenticated caller by default. Supplying an owner selects that owner's principals, subject to the caller's principal-read permissions. Supplying an ID selects a single principal, subject to the same permission check. The default page size is 10 and the maximum page size is 100.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /principals
runtimePath: /principals
method: GET
operationId: enumeratePrincipals
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /principals
get:
  operationId: enumeratePrincipals
  tags:
    - Principals
  description: >-
    Lists principals owned by the authenticated caller by default. Supplying an owner selects that
    owner's principals, subject to the caller's principal-read permissions. Supplying an ID selects
    a single principal, subject to the same permission check. The default page size is 10 and the
    maximum page size is 100.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  responses:
    '200':
      description: Principals retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumeratePrincipalsResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
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
  parameters:
    - name: owner
      in: query
      description: >-
        Owner whose principals to list. Defaults to the authenticated caller when ID is not
        supplied. A different owner requires principal-read permission for each returned principal.
      required: false
      schema:
        type: string
      examples:
        caller:
          value: ~caller
        specific-owner:
          value: port1/principals/user123
    - name: id
      in: query
      description: >-
        Exact principal identifier to retrieve. The result is included only when the caller has
        principal-read permission.
      required: false
      schema:
        type: string
      examples:
        specific-principal:
          value: port1/principals/user123
    - $ref: /docs/references/parameters/ExpandQuery.json
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - $ref: /docs/references/parameters/MaxResultsQuery.json
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
  summary: Enumerate Principals
```

## Linked components

- [ExpandQuery.json](/docs/references/parameters/ExpandQuery.json)
- [MaxResultsQuery.json](/docs/references/parameters/MaxResultsQuery.json)
- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [EnumeratePrincipalsResponse.json](/docs/references/schemas/EnumeratePrincipalsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
