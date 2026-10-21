# First setup and connection verification

Use [the quickstart](/docs/for-ai/guides/quickstart.md). Check three stages separately: reachable metadata/API, a valid authenticated token, and access to the intended resources. A protocol connection alone is not device access.

Port OS runs in the cloud. Use the configured remote MCP connection. Do not install or start a local MCP server, ask for local filesystem access, or download a runtime.

Let the customer complete Port OS sign-in and consent in their browser. Never request an access key in chat or put one in a URL, approve consent yourself, or ask for provider MFA.

Enumerate first. An empty inventory means the account has no visible devices, not that authentication failed. It may need [provider linking](/docs/for-ai/guides/adding-devices.md) or a sharing grant. Do not issue a physical command as an installation test. If the customer asks to test control, select one safe test light and explain the intended command. Follow its exact schema. Read fresh state afterward; ask the user to confirm physically when no reliable observation exists. Dispatch acceptance is not proof of physical completion. Record no passwords or tokens in conversation.

If authorization expires, refresh within the original grant or ask the user to authorize again. Confirm grant revocation in account settings or the documented revocation endpoint. Revoking a website access key stops that key's sign-in and API use. An OAuth connection already approved with it is a separate grant that the customer revokes separately. See [troubleshooting](/docs/for-ai/guides/troubleshooting.md).
