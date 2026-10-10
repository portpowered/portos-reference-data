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
| [GET /.well-known/openid-configuration](/docs/for-ai/operations/getOpenIDConfiguration.md) | Public | — | — |
| [DELETE /{namespace}/{principalType}/{principalId}](/docs/for-ai/operations/deletePrincipal.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required) | — |
| [DELETE /{namespace}/{principalType}/{principalId}/access-control-rules/{ruleId}](/docs/for-ai/operations/deleteAccessControlRule.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required), path:ruleId (required) | — |
| [GET /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}](/docs/for-ai/operations/getEndpointGroup.md) | group:read | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), query:expand, query:forceDeviceAttributeQuery | — |
| [DELETE /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}](/docs/for-ai/operations/deleteEndpointGroup.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | — |
| [POST /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/add-members](/docs/for-ai/operations/addEndpointGroupMembers.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | memberEndpointIds |
| [POST /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/remove-members](/docs/for-ai/operations/removeEndpointGroupMembers.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | memberEndpointIds |
| [POST /{namespace}/{principalType}/{principalId}/endpoint-groups/{groupId}/set-name](/docs/for-ai/operations/setEndpointGroupName.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required), header:If-Match (required) | name |
| [DELETE /{namespace}/{principalType}/{principalId}/flow-runs/{runId}](/docs/for-ai/operations/deleteFlowRun.md) | See session/security contract | path:namespace (required), path:principalType (required), path:principalId (required), path:runId (required) | — |
| [GET /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs](/docs/for-ai/operations/queryFlowRuns.md) | See session/security contract | path:namespace (required), path:principalType (required), path:principalId (required), path:flowId (required), query:pageToken, query:maxResults, query:expand, query:nextToken | — |
| [POST /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs](/docs/for-ai/operations/createFlowRun.md) | See session/security contract | path:namespace (required), path:principalType (required), path:principalId (required), path:flowId (required) | flowRun |
| [POST /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/messages](/docs/for-ai/operations/upsertFlowRunMessage.md) | See session/security contract | path:namespace (required), path:principalType (required), path:principalId (required), path:flowId (required), path:runId (required) | message, target |
| [POST /{namespace}/{principalType}/{principalId}/flows/{flowId}/runs/{runId}/set-status](/docs/for-ai/operations/setFlowRunStatus.md) | See session/security contract | path:namespace (required), path:principalType (required), path:principalId (required), path:flowId (required), path:runId (required) | status |
| [DELETE /{namespace}/{principalType}/{principalId}/group-routes/{groupId}](/docs/for-ai/operations/deleteGroupRoute.md) | group:manage | path:namespace (required), path:principalType (required), path:principalId (required), path:groupId (required) | — |
| [GET /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}](/docs/for-ai/operations/getSubscription.md) | subscription:read | path:namespace (required), path:principalType (required), path:principalId (required), path:subscriptionId (required), query:expand | — |
| [PATCH /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}](/docs/for-ai/operations/patchSubscription.md) | subscription:write | path:namespace (required), path:principalType (required), path:principalId (required), path:subscriptionId (required) | name |
| [DELETE /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}](/docs/for-ai/operations/deleteSubscription.md) | subscription:write | path:namespace (required), path:principalType (required), path:principalId (required), path:subscriptionId (required) | — |
| [DELETE /{namespace}/{principalType}/{principalId}/tokens/{tokenId}](/docs/for-ai/operations/invalidateToken.md) | OAuth (no scope) | path:tokenId (required), path:namespace (required), path:principalType (required), path:principalId (required) | — |
| [GET /{namespace}/{principalType}/{principalId}/views/{viewId}](/docs/for-ai/operations/getView.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required), path:viewId (required), query:expand | — |
| [PUT /{namespace}/{principalType}/{principalId}/views/{viewId}](/docs/for-ai/operations/updateView.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required), path:viewId (required) | positions, schemaVersion, title, widgets |
| [DELETE /{namespace}/{principalType}/{principalId}/views/{viewId}](/docs/for-ai/operations/deleteView.md) | OAuth (no scope) | path:namespace (required), path:principalType (required), path:principalId (required), path:viewId (required) | — |
| [DELETE /{principalType}/{principalId}/flows/{flowId}](/docs/for-ai/operations/deleteFlow.md) | See session/security contract | path:principalType (required), path:principalId (required), path:flowId (required) | — |
| [GET /access-control-rules](/docs/for-ai/operations/getAccessControlRules.md) | OAuth (no scope) | query:owner (required), query:nextToken, query:maxResults, query:expand | — |
| [POST /access-control-rules](/docs/for-ai/operations/upsertAccessControlRule.md) | OAuth (no scope) | — | effect, id, identity, operation, resource |
| [POST /access-control-rules/evaluate](/docs/for-ai/operations/evaluateAccessControlRule.md) | OAuth (no scope) | — | entities, operation, requesterContext, resourceContext |
| [GET /auth-links](/docs/for-ai/operations/enumerateAuthLinks.md) | OAuth (no scope) | query:expand, query:nextToken, query:maxResults | — |
| [POST /auth-links](/docs/for-ai/operations/upsertAuthLink.md) | OAuth (no scope) | — | authLink |
| [DELETE /auth-links](/docs/for-ai/operations/deleteAuthLink.md) | OAuth (no scope) | — | id |
| [POST /auth-links/establish](/docs/for-ai/operations/establishAuthLink.md) | See session/security contract | — | apiKey, applePushNotificationDeviceToken, authLinkId, oauthTokens, pluginId, usernamePassword |
| [POST /auth-links/refresh](/docs/for-ai/operations/refreshAuthLinkToken.md) | See session/security contract | — | authLinkId |
| [POST /auth/callback](/docs/for-ai/operations/handleOAuthCallback.md) | Public | — | code, id_token, state, user |
| [POST /auth/device-authorization](/docs/for-ai/operations/deviceAuthorize.md) | See session/security contract | — | client_id, scope |
| [POST /auth/raise](/docs/for-ai/operations/raiseAnonymousPrincipal.md) | Public | — | anonymous_refresh_token, subject_token, subject_token_type |
| [POST /auth/revoke](/docs/for-ai/operations/revokeOAuthGrant.md) | Public | — | client_id, token |
| [POST /auth/token](/docs/for-ai/operations/generateToken.md) | Public | — | client_id, client_secret, code, code_verifier, grant_type, redirect_uri, refresh_token, resource, scope |
| [POST /discovery](/docs/for-ai/operations/synchronizeRoutes.md) | See session/security contract | — | authLinkIdentity, groupRoutes, pluginIdentity, relationships, routes |
| [GET /endpoint-groups](/docs/for-ai/operations/enumerateEndpointGroups.md) | group:read | query:enablement, query:owner (required), query:nextToken, query:maxResults, query:expand, query:forceDeviceAttributeQuery | — |
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
| [GET /flow-node-specifications](/docs/for-ai/operations/enumerateFlowNodeSpecifications.md) | See session/security contract | query:nextToken, query:maxResults, query:expand | — |
| [GET /flow-nodes](/docs/for-ai/operations/enumerateFlowNodes.md) | See session/security contract | query:expand, query:nextToken, query:maxResults | — |
| [POST /flow-nodes](/docs/for-ai/operations/createFlowNode.md) | See session/security contract | — | flow |
| [DELETE /flow-nodes](/docs/for-ai/operations/deleteFlowNode.md) | See session/security contract | — | id |
| [GET /flows](/docs/for-ai/operations/queryFlows.md) | See session/security contract | query:owner, query:id, query:nextToken, query:maxResults, query:expand | — |
| [POST /flows](/docs/for-ai/operations/upsertFlow.md) | See session/security contract | — | flow |
| [POST /flows/trigger](/docs/for-ai/operations/triggerFlow.md) | See session/security contract | — | flow, triggers |
| [GET /group-relationships](/docs/for-ai/operations/enumerateGroupRelationships.md) | group:read | query:owner (required), query:groupId, query:routeId, query:endpointId, query:nextToken, query:maxResults, query:expand | — |
| [GET /group-routes](/docs/for-ai/operations/enumerateGroupRoutes.md) | group:read | query:owner (required), query:nextToken, query:maxResults, query:expand | — |
| [POST /integration-requests](/docs/for-ai/operations/requestFutureIntegration.md) | Public | — | consent, email, pluginId |
| [POST /messages](/docs/for-ai/operations/sendMessage.md) | message:send | — | message, responseType, target |
| [POST /messages-gateway](/docs/for-ai/operations/pushToMessageGateway.md) | OAuth (no scope) | — | auth-token, body, context, correlationToken, endpoint, header, ownerId, secrets, target, type |
| [POST /messages/send](/docs/for-ai/operations/sendMessageLegacyAlias.md) | message:send | — | message, responseType, target |
| [GET /metrics](/docs/for-ai/operations/getMetrics.md) | Public | — | — |
| [GET /oauth-clients](/docs/for-ai/operations/enumerateOAuthClients.md) | OAuth (no scope) | query:nextToken, query:maxResults, query:expand | — |
| [POST /oauth-clients](/docs/for-ai/operations/createOAuthClient.md) | OAuth (no scope) | — | allowedOrigins, clientName, clientUri, clientUriLocalized, contacts, grantTypes, jwks, jwksUri, logoUri, logoUriLocalized, policyUri, policyUriLocalized, redirectUris, responseTypes, scope, scopes, softwareId, softwareVersion, tokenEndpointAuthMethod, tokenEndpointAuthSigningAlg, tosUri, tosUriLocalized |
| [GET /oauth/authorization-request](/docs/for-ai/operations/getPendingOAuthConsent.md) | See session/security contract | query:request_id (required) | — |
| [GET /oauth/authorize](/docs/for-ai/operations/beginOAuthAuthorization.md) | Public | query:client_id (required), query:redirect_uri (required), query:response_type (required), query:scope (required), query:state (required), query:resource (required), query:code_challenge (required), query:code_challenge_method (required) | — |
| [POST /oauth/authorize](/docs/for-ai/operations/completeOAuthConsent.md) | See session/security contract | — | approved, request_id, scope |
| [POST /oauth/authorize-device](/docs/for-ai/operations/authorizeDevice.md) | OAuth (no scope) | — | scopes, user_code |
| [POST /oauth/generate-code](/docs/for-ai/operations/generateOAuthCode.md) | OAuth (no scope) | — | client_id, code_challenge, code_challenge_method, redirect_uri, scopes, state |
| [POST /oauth/register](/docs/for-ai/operations/registerDynamicOAuthClient.md) | Public | — | client_name, client_uri, grant_types, redirect_uris, response_types, scope, software_id, software_statement, software_version, token_endpoint_auth_method |
| [POST /oauth/validate-request](/docs/for-ai/operations/validateOAuthRequest.md) | See session/security contract | — | client_id, code_challenge, code_challenge_method, redirect_uri, scopes |
| [GET /oauth/verify-device](/docs/for-ai/operations/verifyDevice.md) | Public | query:user_code (required) | — |
| [GET /ping](/docs/for-ai/operations/ping.md) | Public | — | — |
| [POST /plugin-auth-code-exchange](/docs/for-ai/operations/pluginAuthCodeExchange.md) | OAuth (no scope) | — | authLinkId, pluginAuthenticationData, pluginId, principalId |
| [POST /plugin-auth-code-link](/docs/for-ai/operations/pluginAuthCodeLink.md) | OAuth (no scope) | — | pluginId, principalId |
| [POST /plugin-auth-multifactor-exchange](/docs/for-ai/operations/pluginAuthMultifactorExchange.md) | OAuth (no scope) | — | pluginAuthenticationData, pluginId, principalId |
| [GET /plugins](/docs/for-ai/operations/enumeratePlugins.md) | OAuth (no scope) | query:expand, query:id, query:nextToken, query:maxResults | — |
| [POST /plugins](/docs/for-ai/operations/upsertPluginRequest.md) | OAuth (no scope) | — | applePushNotificationSecret, plugin, secretReferenceId |
| [DELETE /plugins](/docs/for-ai/operations/deletePlugin.md) | OAuth (no scope) | — | id |
| [POST /plugins/establish](/docs/for-ai/operations/establishPlugin.md) | See session/security contract | — | plugin |
| [GET /port1/{principalType}/{principalId}/oauth-clients/{clientId}](/docs/for-ai/operations/getOAuthClient.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required), query:expand | — |
| [PUT /port1/{principalType}/{principalId}/oauth-clients/{clientId}](/docs/for-ai/operations/updateOAuthClient.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required) | allowedOrigins, clientName, clientUri, clientUriLocalized, contacts, grantTypes, jwks, jwksUri, logoUri, logoUriLocalized, policyUri, policyUriLocalized, redirectUris, responseTypes, scope, scopes, softwareId, softwareVersion, tokenEndpointAuthMethod, tokenEndpointAuthSigningAlg, tosUri, tosUriLocalized |
| [DELETE /port1/{principalType}/{principalId}/oauth-clients/{clientId}](/docs/for-ai/operations/deleteOAuthClient.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:clientId (required) | — |
| [DELETE /port1/{principalType}/{principalId}/secrets/{secretId}](/docs/for-ai/operations/deleteSecret.md) | OAuth (no scope) | path:principalType (required), path:principalId (required), path:secretId (required) | — |
| [GET /principals](/docs/for-ai/operations/enumeratePrincipals.md) | OAuth (no scope) | query:expand, query:nextToken, query:maxResults | — |
| [POST /principals](/docs/for-ai/operations/upsertPrincipal.md) | OAuth (no scope) | — | item |
| [GET /routes](/docs/for-ai/operations/getRoutes.md) | endpoint:read | query:expand, query:nextToken, query:maxResults | — |
| [POST /routes](/docs/for-ai/operations/upsertRoute.md) | endpoint:write | — | endpointId, id, interfaces, metadata, pluginId |
| [DELETE /routes](/docs/for-ai/operations/deleteRoute.md) | endpoint:write | — | id |
| [GET /secrets](/docs/for-ai/operations/enumerateSecrets.md) | OAuth (no scope) | query:id, query:owner, query:nextToken, query:maxResults, query:expand | — |
| [POST /secrets](/docs/for-ai/operations/upsertSecret.md) | OAuth (no scope) | — | secret |
| [GET /subscriptions](/docs/for-ai/operations/enumerateSubscriptions.md) | subscription:read | query:expand, query:nextToken, query:maxResults | — |
| [POST /subscriptions](/docs/for-ai/operations/upsertSubscription.md) | subscription:write | — | subscription |
| [GET /tokens](/docs/for-ai/operations/enumerateTokens.md) | OAuth (no scope) | query:nextToken, query:maxResults, query:expand | — |
| [POST /tokens](/docs/for-ai/operations/createToken.md) | OAuth (no scope) | — | expires_in, label, scope, subject |
| [POST /tuya/qrcode](/docs/for-ai/operations/generateTuyaQrCode.md) | Public | — | accessCode, authenticationUrl, clientId, schema |
| [POST /tuya/validatetoken](/docs/for-ai/operations/validateTuyaLoginCode.md) | Public | — | authenticationUrl, clientId, loginCode, userCode |
| [GET /views](/docs/for-ai/operations/enumerateViews.md) | OAuth (no scope) | query:nextToken, query:maxResults, query:expand | — |
| [POST /views](/docs/for-ai/operations/createView.md) | OAuth (no scope) | — | positions, schemaVersion, title, widgets |
| [POST /webhooks/github](/docs/for-ai/operations/handleGitHubWebhook.md) | Public | header:X-Hub-Signature-256 (required), header:X-GitHub-Delivery, header:X-GitHub-Event | — |
| [POST /webhooks/google-cloud-scheduler](/docs/for-ai/operations/handleGoogleCloudSchedulerWebhook.md) | See session/security contract | — | flow_id, node_id |
| [POST /webhooks/smartthings](/docs/for-ai/operations/handleSmartThingsWebhook.md) | OAuth (no scope) | — | — |
