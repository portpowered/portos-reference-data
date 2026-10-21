# Port OS API catalog: compact reference

For a new connection, read [authentication and DCR/CIMD](/docs/for-ai/guides/authentication-and-dcr.md), then [the REST quickstart](/docs/for-ai/guides/quickstart.md). Registration grants no device access. Discover the issuer and endpoints; choose REST or MCP before consent, use PKCE, validate the callback, then exchange its code. REST uses the issuer as its OAuth resource; MCP uses its /mcp resource.

Operation scopes and resource permissions both apply. [Authorization rules](/docs/for-ai/guides/authorization-rules.md) explain consent, sharing, evaluation and denial. Bearer-session alternatives describe signed-in user sessions; they do not bypass delegated-token scopes.

This index lists public operations, parameter names and top-level JSON keys. Required, conditional and nested fields remain in each linked operation/schema contract. Read only the contract needed for your next request. [Capability index](/docs/for-ai/capability-interfaces.md).

To request the complete rendered catalog, fetch `/api/?full=1` with an HTML-compatible Accept header. [Full OpenAPI YAML](/docs/references/openapi.yaml) is available for comprehensive lookup and SDK generation.

| Operation contract | OAuth scopes / conditional scopes | Parameters | Top-level JSON body keys |
| --- | --- | --- | --- |
| [GET /.well-known/jwks.json](/docs/for-ai/operations/getJWKS.md) | Public | — | — |
| [GET /.well-known/oauth-authorization-server](/docs/for-ai/operations/getOAuthAuthorizationServerMetadata.md) | Public | — | — |
| [GET /.well-known/oauth-protected-resource](/docs/for-ai/operations/getOAuthProtectedResourceMetadata.md) | Public | — | — |
| [GET /.well-known/oauth-protected-resource/mcp](/docs/for-ai/operations/getMCPOAuthProtectedResourceMetadata.md) | Public | — | — |
| [DELETE /{namespace}/{principalType}/{principalId}](/docs/for-ai/operations/deletePrincipal.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required) | — |
| [DELETE /{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}](/docs/for-ai/operations/deleteAccessControlRule.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required), path:ruleId (required), query:reason | — |
| [POST /{namespace}/{principalType}/{principalId}/auth-links/{authLinkId}/update-draft](/docs/for-ai/operations/updateAuthLinkDraft.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required), path:authLinkId (required), header:If-Match (required) | oauthClient, providerConfiguration, regionalizationId |
| [GET /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}](/docs/for-ai/operations/getEndpointGroup.md) | group:read | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), query:expand, query:forceDeviceAttributeQuery | — |
| [DELETE /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}](/docs/for-ai/operations/deleteEndpointGroup.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | — |
| [POST /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/add-members](/docs/for-ai/operations/addEndpointGroupMembers.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | memberEndpointIds |
| [POST /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/remove-members](/docs/for-ai/operations/removeEndpointGroupMembers.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | memberEndpointIds |
| [POST /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/set-name](/docs/for-ai/operations/setEndpointGroupName.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | name |
| [DELETE /{namespace}/{principalType}/{principalId}/group-routes/{groupId}](/docs/for-ai/operations/deleteGroupRoute.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required) | — |
| [GET /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}](/docs/for-ai/operations/getSubscription.md) | subscription:read | path:namespace (required), path:principalType (required), path:principalId (required), path:subscriptionId (required), query:expand | — |
| [PATCH /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}](/docs/for-ai/operations/patchSubscription.md) | subscription:write | path:namespace (required), path:principalType (required), path:principalId (required), path:subscriptionId (required) | name |
| [DELETE /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}](/docs/for-ai/operations/deleteSubscription.md) | subscription:write | path:namespace (required), path:principalType (required), path:principalId (required), path:subscriptionId (required) | — |
| [DELETE /{namespace}/{principalType}/{principalId}/tokens/{tokenId}](/docs/for-ai/operations/invalidateToken.md) | OAuth (no scope) | path:tokenId (required), path:namespace (required), path:principalType (required), path:principalId (required) | — |
| [GET /access-control-rules](/docs/for-ai/operations/getAccessControlRules.md) | OAuth (no scope) | query:owner, query:id, query:operation, query:resource, query:identity, query:nextToken, query:maxResults, query:expand | — |
| [POST /access-control-rules](/docs/for-ai/operations/upsertAccessControlRule.md) | OAuth (no scope) | — | conditions, effect, id, identity, operation, reason, resource |
| [POST /access-control-rules/evaluate](/docs/for-ai/operations/evaluateAccessControlRule.md) | OAuth (no scope) | — | entities, operation, operationContext, requesterContext, resourceContext |
| [POST /auth-link-drafts](/docs/for-ai/operations/createAuthLinkDraft.md) | OAuth (no scope) | header:Idempotency-Key (required) | authorizationVariantId, oauthClient, pluginId, providerConfiguration, regionalizationId |
| [GET /auth-links](/docs/for-ai/operations/enumerateAuthLinks.md) | OAuth (no scope) | query:status, query:pluginId, query:expand, query:nextToken, query:maxResults | — |
| [POST /auth-links](/docs/for-ai/operations/upsertAuthLink.md) | OAuth (no scope) | — | authLink |
| [DELETE /auth-links](/docs/for-ai/operations/deleteAuthLink.md) | OAuth (no scope) | — | id |
| [POST /auth-links/establish](/docs/for-ai/operations/establishAuthLink.md) | See session/security contract | — | apiKey, applePushNotificationDeviceToken, authLinkId, authorizationVariantId, endpointUrl, oauthTokens, pluginId, regionalizationId, usernamePassword |
| [GET /auth-links/oauth-client-credentials](/docs/for-ai/operations/enumerateAuthLinkClientCredentials.md) | OAuth (no scope) | query:pluginId (required), query:maxResults, query:nextToken | — |
| [POST /auth-links/refresh](/docs/for-ai/operations/refreshAuthLinkToken.md) | See session/security contract | — | authLinkId |
| [POST /auth/callback](/docs/for-ai/operations/handleOAuthCallback.md) | Public | — | code, id_token, state, user |
| [POST /auth/device-authorization](/docs/for-ai/operations/deviceAuthorize.md) | See session/security contract | — | client_id, scope |
| [POST /auth/raise](/docs/for-ai/operations/raiseAnonymousPrincipal.md) | Public | — | anonymous_refresh_token, subject_token, subject_token_type |
| [POST /auth/revoke](/docs/for-ai/operations/revokeOAuthGrant.md) | Public | — | client_id, token |
| [POST /auth/token](/docs/for-ai/operations/generateToken.md) | Public | — | audience, client_assertion, client_assertion_type, client_id, client_secret, code, code_verifier, device_code, grant_type, redirect_uri, refresh_token, requested_token_type, resource, scope, subject_token, subject_token_type |
| [POST /discovery](/docs/for-ai/operations/synchronizeRoutes.md) | See session/security contract | — | authLinkIdentity, groupRoutes, pluginIdentity, relationships, routes |
| [GET /endpoint-groups](/docs/for-ai/operations/enumerateEndpointGroups.md) | group:read | query:enablement, query:owner, query:nextToken, query:maxResults, query:expand, query:forceDeviceAttributeQuery | — |
| [POST /endpoint-groups](/docs/for-ai/operations/createEndpointGroup.md) | group:manage | — | item |
| [POST /endpoint-groups-manage](/docs/for-ai/operations/endpointGroupsManage.md) | group:manage | header:Idempotency-Key (required) | operations, validateOnly |
| [POST /endpoint-query](/docs/for-ai/operations/endpointQuery.md) | endpoint:read; groupId: group:read | — | expand, forceDeviceQuery, paginationContext, query |
| [GET /endpoint-simulators](/docs/for-ai/operations/enumerateSimulators.md) | See session/security contract | query:owner, query:maxResults, query:nextToken, query:expand | — |
| [POST /endpoint-simulators](/docs/for-ai/operations/upsertSimulator.md) | See session/security contract | — | configuration, device_type, id, name, state |
| [DELETE /endpoint-simulators](/docs/for-ai/operations/deleteSimulator.md) | See session/security contract | — | id |
| [GET /endpoints](/docs/for-ai/operations/enumerateEndpoints.md) | endpoint:read | query:enablement, query:owner, query:id, query:type, query:serialNumber, query:nextToken, query:maxResults, query:expand, query:forceDeviceAttributeQuery | — |
| [POST /endpoints](/docs/for-ai/operations/upsertEndpoint.md) | endpoint:write | — | id, name, type |
| [PATCH /endpoints](/docs/for-ai/operations/modifyEndpoint.md) | endpoint:write | — | enablement, id, mergeInto, name, type |
| [DELETE /endpoints](/docs/for-ai/operations/deleteEndpoint.md) | endpoint:write | — | id |
| [GET /event-dead-letters](/docs/for-ai/operations/enumerateEventDeadLetters.md) | See session/security contract | query:nextToken, query:maxResults, query:query, query:expand | — |
| [GET /event-dead-letters/{id}](/docs/for-ai/operations/getEventDeadLetter.md) | See session/security contract | path:id (required), query:expand | — |
| [DELETE /event-dead-letters/{id}](/docs/for-ai/operations/deleteEventDeadLetter.md) | See session/security contract | path:id (required) | — |
| [POST /event-dead-letters/{id}/redrives](/docs/for-ai/operations/redriveEventDeadLetter.md) | See session/security contract | path:id (required) | — |
| [POST /events](/docs/for-ai/operations/createSyntheticEvent.md) | See session/security contract | — | body, endpoint, header, requestId |
| [GET /events/receipts/{receiptId}](/docs/for-ai/operations/getEventReceipt.md) | See session/security contract | path:receiptId (required), query:expand | — |
| [GET /group-routes](/docs/for-ai/operations/enumerateGroupRoutes.md) | group:read | query:owner, query:nextToken, query:maxResults, query:expand | — |
| [POST /integration-requests](/docs/for-ai/operations/requestFutureIntegration.md) | Public | — | consent, email, manufacturer, pluginId |
| [POST /messages](/docs/for-ai/operations/sendMessage.md) | message:send | — | message, responseType, target |
| [POST /messages-gateway](/docs/for-ai/operations/pushToMessageGateway.md) | OAuth (no scope) | — | auth-token, body, context, correlationToken, endpoint, header, ownerId, secrets, target, type |
| [GET /metrics](/docs/for-ai/operations/getMetrics.md) | Public | — | — |
| [GET /oauth-clients](/docs/for-ai/operations/enumerateOAuthClients.md) | OAuth (no scope) | query:nextToken, query:maxResults, query:expand | — |
| [POST /oauth-clients](/docs/for-ai/operations/createOAuthClient.md) | OAuth (no scope) | — | allowedOrigins, clientName, clientUri, clientUriLocalized, contacts, grantTypes, jwks, jwksUri, logoUri, logoUriLocalized, policyUri, policyUriLocalized, redirectUris, responseTypes, scope, scopes, softwareId, softwareVersion, tokenEndpointAuthMethod, tokenEndpointAuthSigningAlg, tosUri, tosUriLocalized |
| [GET /oauth/authorization-request](/docs/for-ai/operations/getPendingOAuthConsent.md) | See session/security contract | query:request_id (required) | — |
| [GET /oauth/authorization-response](/docs/for-ai/operations/deliverOAuthAuthorizationResponse.md) | Public | query:request_id (required) | — |
| [GET /oauth/authorize](/docs/for-ai/operations/beginOAuthAuthorization.md) | Public | query:client_id (required), query:redirect_uri (required), query:response_type (required), query:scope (required), query:state (required), query:resource, query:code_challenge (required), query:code_challenge_method (required) | — |
| [POST /oauth/authorize](/docs/for-ai/operations/completeOAuthConsent.md) | See session/security contract | — | approved, request_id, scope |
| [POST /oauth/register](/docs/for-ai/operations/registerDynamicOAuthClient.md) | Public | — | client_name, client_uri, grant_types, redirect_uris, response_types, scope, software_id, software_statement, software_version, token_endpoint_auth_method |
| [GET /ping](/docs/for-ai/operations/ping.md) | Public | — | — |
| [POST /plugin-auth-code-exchange](/docs/for-ai/operations/pluginAuthCodeExchange.md) | OAuth (no scope) | — | authLinkId, authorizationVariantId, pluginAuthenticationData, pluginId, principalId, regionalizationId |
| [POST /plugin-auth-code-link](/docs/for-ai/operations/pluginAuthCodeLink.md) | OAuth (no scope) | — | authorizationVariantId, pluginId, principalId, regionalizationId |
| [POST /plugin-auth-multifactor-exchange](/docs/for-ai/operations/pluginAuthMultifactorExchange.md) | OAuth (no scope) | — | authorizationVariantId, pluginAuthenticationData, pluginId, principalId, regionalizationId |
| [POST /plugin-oauth-authorization-completions](/docs/for-ai/operations/completePluginOAuthAuthorization.md) | OAuth (no scope) | header:Idempotency-Key (required) | authLinkId, code, pluginId, redirectUri, state |
| [POST /plugin-oauth-authorizations](/docs/for-ai/operations/beginPluginOAuthAuthorization.md) | OAuth (no scope) | header:Idempotency-Key (required) | authLinkId, pluginId, redirectUri |
| [GET /plugins](/docs/for-ai/operations/enumeratePlugins.md) | OAuth (no scope) | query:expand, query:id, query:nextToken, query:maxResults | — |
| [POST /plugins](/docs/for-ai/operations/upsertPluginRequest.md) | OAuth (no scope) | — | applePushNotificationSecret, plugin, secretReferenceId |
| [DELETE /plugins](/docs/for-ai/operations/deletePlugin.md) | OAuth (no scope) | — | id |
| [POST /plugins/establish](/docs/for-ai/operations/establishPlugin.md) | See session/security contract | — | plugin |
| [GET /port1/{principalType}/{principalId}/oauth-clients/{clientId}](/docs/for-ai/operations/getOAuthClient.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required), query:expand | — |
| [PUT /port1/{principalType}/{principalId}/oauth-clients/{clientId}](/docs/for-ai/operations/updateOAuthClient.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required) | allowedOrigins, clientName, clientUri, clientUriLocalized, contacts, grantTypes, jwks, jwksUri, logoUri, logoUriLocalized, policyUri, policyUriLocalized, redirectUris, responseTypes, scope, scopes, softwareId, softwareVersion, tokenEndpointAuthMethod, tokenEndpointAuthSigningAlg, tosUri, tosUriLocalized |
| [DELETE /port1/{principalType}/{principalId}/oauth-clients/{clientId}](/docs/for-ai/operations/deleteOAuthClient.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required) | — |
| [GET /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets](/docs/for-ai/operations/listOAuthClientSecrets.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required) | — |
| [POST /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets](/docs/for-ai/operations/generateOAuthClientSecret.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required) | — |
| [DELETE /port1/{principalType}/{principalId}/oauth-clients/{clientId}/secrets/{secretId}](/docs/for-ai/operations/revokeOAuthClientSecret.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required), path:secretId (required) | — |
| [DELETE /port1/{principalType}/{principalId}/secrets/{secretId}](/docs/for-ai/operations/deleteSecret.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:secretId (required) | — |
| [GET /principals](/docs/for-ai/operations/enumeratePrincipals.md) | OAuth (no scope) | query:owner, query:id, query:expand, query:nextToken, query:maxResults | — |
| [POST /principals](/docs/for-ai/operations/upsertPrincipal.md) | OAuth (no scope) | — | item |
| [GET /relationships](/docs/for-ai/operations/enumerateRelationships.md) | group:read | query:owner, query:groupId, query:routeId, query:endpointId, query:vertexId, query:parentId, query:type, query:nextToken, query:maxResults, query:expand | — |
| [GET /routes](/docs/for-ai/operations/getRoutes.md) | endpoint:read | query:owner, query:expand, query:nextToken, query:maxResults | — |
| [POST /routes](/docs/for-ai/operations/upsertRoute.md) | endpoint:write | — | endpointId, id, interfaces, metadata, pluginId |
| [DELETE /routes](/docs/for-ai/operations/deleteRoute.md) | endpoint:write | — | id |
| [GET /secrets](/docs/for-ai/operations/enumerateSecrets.md) | OAuth (no scope) | query:id, query:owner, query:nextToken, query:maxResults, query:expand | — |
| [POST /secrets](/docs/for-ai/operations/upsertSecret.md) | OAuth (no scope) | — | secret |
| [GET /subscriptions](/docs/for-ai/operations/enumerateSubscriptions.md) | subscription:read | query:id, query:owner, query:expand, query:nextToken, query:maxResults | — |
| [POST /subscriptions](/docs/for-ai/operations/upsertSubscription.md) | subscription:write | — | subscription |
| [GET /tokens](/docs/for-ai/operations/enumerateTokens.md) | OAuth (no scope) | query:nextToken, query:maxResults, query:expand | — |
| [POST /tokens](/docs/for-ai/operations/createToken.md) | OAuth (no scope) | — | expires_in, label, purpose, scope, subject |
| [POST /tuya/qrcode](/docs/for-ai/operations/generateTuyaQrCode.md) | Public | — | accessCode, authenticationUrl, clientId, schema |
| [POST /tuya/validatetoken](/docs/for-ai/operations/validateTuyaLoginCode.md) | Public | — | authenticationUrl, clientId, loginCode, userCode |
| [POST /webhooks/google-cloud-scheduler](/docs/for-ai/operations/handleGoogleCloudSchedulerWebhook.md) | See session/security contract | — | flow_id, node_id |
| [POST /webhooks/smartthings](/docs/for-ai/operations/handleSmartThingsWebhook.md) | OAuth (no scope) | — | — |
