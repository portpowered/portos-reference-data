# upsertSecret

POST `/secrets`



Create a secret, which is a special type of data that is secured. 
Secrets are special data that can be very dangerous to use, and so is put in a special database. 

Some well known types of secrets include: 
Random secret data, access tokens, passwords, and various others. 

### Generic secrets
If you want to keep something secret, and have it super safe, you can create a secret. 
This secret is stored in portos with a unique resource identifier for a storage document. 

For example, maybe you have client credentials or something that is a generic json blob. 

i.e. https://api.portpowered.com/storage/secrets/portos1.secret.<UUID>

### Tokens
A specialized type of secret is a OAUTH token secret. This secret is often used to access plugins, so 
there are specialized indexes to make token look up faster. 


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /secrets
runtimePath: /secrets
method: POST
operationId: upsertSecret
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /secrets
post:
  tags:
    - Secrets
  operationId: upsertSecret
  description: >-
    Create a secret, which is a special type of data that is secured. 

    Secrets are special data that can be very dangerous to use, and so is put in a special
    database. 


    Some well known types of secrets include: 

    Random secret data, access tokens, passwords, and various others. 


    ### Generic secrets

    If you want to keep something secret, and have it super safe, you can create a secret. 

    This secret is stored in portos with a unique resource identifier for a storage document. 


    For example, maybe you have client credentials or something that is a generic json blob. 


    i.e. https://api.portpowered.com/storage/secrets/portos1.secret.<UUID>


    ### Tokens

    A specialized type of secret is a OAUTH token secret. This secret is often used to access
    plugins, so 

    there are specialized indexes to make token look up faster. 



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertSecretRequest'
        example:
          secret:
            id: port1/principals/example
            type: LIGHT
            clientId: port1/principals/example
            clientSecret: port1/principals/example
  responses:
    '200':
      description: Secret created successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpsertSecretResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
