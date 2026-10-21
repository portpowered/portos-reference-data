# invalidateToken

DELETE `/{namespace}/{principalType}/{principalId}/tokens/{tokenId}`

Invalidate Token

Revokes the access key's active record so subsequent website and API requests using that bearer are rejected. The token ID is the ID returned by create/list and carried in its JWT jti claim. Only the owner may revoke it. OAuth connections explicitly approved with a website key are independent grants and must be revoked separately.


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
    Revokes the access key's active record so subsequent website and API requests using that bearer
    are rejected. The token ID is the ID returned by create/list and carried in its JWT jti claim.
    Only the owner may revoke it. OAuth connections explicitly approved with a website key are
    independent grants and must be revoked separately.



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
  summary: Invalidate Token
```

## Linked components

- [InvalidateTokenResponse.json](/docs/references/schemas/InvalidateTokenResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
