# invalidateToken

DELETE `/{namespace}/{principalType}/{principalId}/tokens/{tokenId}`



Revokes the token so it can no longer be used for exchange. The token id in the path is the same as the id returned from create/list and as the JWT jti claim. Only the refresh token is revoked; any access tokens already issued from it remain valid until they expire. Only the owner may invalidate a token.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/tokens/{tokenId}
runtimePath: /{namespace}/{principalType}/{principalId}/tokens/{tokenId}
method: DELETE
operationId: invalidateToken
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/tokens/{tokenId}
delete:
  operationId: invalidateToken
  tags:
    - Tokens
  description: >-
    Revokes the token so it can no longer be used for exchange. The token id in the path is the same
    as the id returned from create/list and as the JWT jti claim. Only the refresh token is revoked;
    any access tokens already issued from it remain valid until they expire. Only the owner may
    invalidate a token.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: tokenId
      in: path
      required: true
      schema:
        type: string
      description: The token identifier (partial ID)
    - name: namespace
      required: true
      in: path
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      required: true
      in: path
      schema:
        type: string
      description: The type of principal
    - name: principalId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the principal
  responses:
    '200':
      description: Token invalidated successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/InvalidateTokenResponse.json
          example:
            message: The request could not be completed. Check the supplied parameters and try again.
    '401':
      description: Unauthorized
    '403':
      description: Forbidden - not owner of the token
    '404':
      description: Token id not found
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [InvalidateTokenResponse.json](/docs/references/schemas/InvalidateTokenResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
