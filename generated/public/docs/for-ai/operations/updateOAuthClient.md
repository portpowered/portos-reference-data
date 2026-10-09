# updateOAuthClient

PUT `/port1/{principalType}/{principalId}/oauth-clients/{clientId}`



Updates an existing OAuth client.
This endpoint allows you to update the configuration of an OAuth client,  such as its name, redirect URIs, grant types, and scopes.
Note: The client secret cannot be updated through this endpoint. If you  need to rotate the client secret, you should create a new client.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}
runtimePath: /{namespace}/{principalType}/{principalId}/oauth-clients/{clientId}
method: PUT
operationId: updateOAuthClient
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}
put:
  operationId: updateOAuthClient
  tags:
    - Clients
  description: >-
    Updates an existing OAuth client.

    This endpoint allows you to update the configuration of an OAuth client,  such as its name,
    redirect URIs, grant types, and scopes.

    Note: The client secret cannot be updated through this endpoint. If you  need to rotate the
    client secret, you should create a new client.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that owns the OAuth client
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that owns the OAuth client
    - name: clientId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the OAuth client to update
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/OAuthClientUpdateRequest'
        example:
          name:
            type: PLAIN
            value: Updated Resource
  responses:
    '200':
      description: OAuth client updated successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpdateOAuthClientResponse'
          example:
            clientId: port1/principals/example
    '400':
      description: Invalid request payload
    '401':
      description: Unauthorized - invalid or missing authentication token
    '404':
      description: OAuth client not found
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
