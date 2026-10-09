# Connect Grok to Port OS

Copy this prompt into your client:

> Read the Port OS agent guide at https://app.portoperatingsystem.lol/docs/for-ai/index.md and help me connect my devices. Ask me to authorize access on Port OS, then list the devices I can access.

The client must support the published REST OAuth authorization-code/PKCE profile, including DCR when required, or supported MCP authorization. Client-specific compatibility remains subject to actual client/version acceptance; this guide does not imply a verified vendor integration.

Follow [authentication and DCR](/docs/for-ai/guides/authentication-and-dcr.md). The user signs in and approves access on Port OS; credentials stay in the connector's secure storage. Begin with endpoint:read and add message:send only for device control. Verify using [first setup](/docs/for-ai/guides/first-setup.md).

## Troubleshooting

Read [connection recovery](/docs/for-ai/guides/troubleshooting.md) and [authorization rules](/docs/for-ai/guides/authorization-rules.md). A registration's client name is descriptive and unverified. Confirm that your client can handle the exact callback and supported registration metadata; do not bypass consent with an unrestricted token.
