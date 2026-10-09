# Authentication and dynamic client registration

All supported agents use the same OAuth components. REST and MCP select different protected resources; DCR and CIMD select different registration methods. Neither product branding nor registration grants device access.

Start with [Connect any supported agent](/docs/for-ai/guides/connect-agent.md), or follow these components in order:

1. [Discover endpoints and choose REST or MCP](/docs/for-ai/guides/oauth-discovery.md).
2. [Register with DCR or supported CIMD](/docs/for-ai/guides/oauth-client-registration.md). Remote callbacks require HTTPS; local callback registrations contain only localhost/loopback callbacks. Repeated canonical fingerprints reuse the original public client without expanding scopes.
3. [Obtain user consent and validate the callback](/docs/for-ai/guides/oauth-consent-and-callback.md). PKCE S256 is required. Pause for the user to sign in and approve access.
4. [Exchange, refresh and revoke tokens](/docs/for-ai/guides/oauth-token-lifecycle.md). Keep the same canonical resource through authorization, exchange and refresh.
5. [Verify the connection](/docs/for-ai/guides/first-setup.md), then use [the REST quickstart](/docs/for-ai/guides/quickstart.md) or your client's MCP tools.

Read [authorization rules](/docs/for-ai/guides/authorization-rules.md) for scopes, principal/resource policies, sharing and denial diagnosis. Never ask for a Google password, paste credentials into chat, or approve the agent's own grant. Claimed client names such as Muse and Grok remain unverified.
