# modifyEndpoint

PATCH `/endpoints`



Apply endpoint partial metadata, enablement or merge changes in one SQLite transaction. At least one field besides id is required. An empty 202 is returned only after commit; clients may requery metadata. Endpoint updated notifications are best effort. A merge cannot cross owners or silently rewrite unsupported dependencies; conflicts roll back all changes.

## Authorization

```yaml
path: /endpoints
runtimePath: /endpoints
method: PATCH
operationId: modifyEndpoint
security:
  - oauth2:
      - endpoint:write
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoints
patch:
  operationId: modifyEndpoint
  tags:
    - Endpoints
  description: >-
    Apply endpoint partial metadata, enablement or merge changes in one SQLite transaction. At least
    one field besides id is required. An empty 202 is returned only after commit; clients may
    requery metadata. Endpoint updated notifications are best effort. A merge cannot cross owners or
    silently rewrite unsupported dependencies; conflicts roll back all changes.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/ModifyEndpointRequest.json
        example:
          id: port1/principals/user123/endpoints/abc-123
          name: Lounge lamp
          type: LIGHT
          enablement: ENABLED
  responses:
    '202':
      description: Endpoint modification committed; empty response.
    '400':
      description: Invalid partial update or incompatible merge.
    '401':
      description: Authentication required.
    '403':
      description: Endpoint management or dependency permission denied.
    '404':
      description: Endpoint not found.
    '409':
      description: Dependent state prevents merge; nothing changed.
    '500':
      description: Modification failed before commit.
    '503':
      description: >-
        ENDPOINT_COMMITTED_CLEANUP_PENDING. The modification committed, but required active-work
        cleanup is pending. Re-read source and target before retrying.
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:write
    - bearerAuth: []
```

## Linked components

- [ModifyEndpointRequest.json](/docs/references/schemas/ModifyEndpointRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
