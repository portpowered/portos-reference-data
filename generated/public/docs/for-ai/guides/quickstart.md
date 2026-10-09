# Verify the connection and control one light

First complete [OAuth setup](/docs/for-ai/guides/authentication-and-dcr.md). Keep the discovered API issuer and credentials in client configuration.

1. GET /endpoints?owner=~caller&maxResults=25 with Authorization: Bearer <access_token>. Read [enumerateEndpoints](/docs/for-ai/operations/enumerateEndpoints.md) for the exact pagination and response fields. A filter such as owner is required. Follow the returned continuation metadata until the authorized enumeration is complete. An empty list means valid access with no visible devices; guide the user to [add devices](/docs/for-ai/guides/adding-devices.md).
2. Select one light by full endpoint ID and group/room context. If the target is ambiguous, ask the user before acting.
3. Inspect its declared capability namespace and version. A light declaring power 1.0 uses the [power guide](/docs/for-ai/capability-interfaces/power/1.0.md) and [turn-on payload schema](/docs/references/capability-interfaces/power/1.0/messages/turn-on.yaml). For other versions or capabilities, follow [the capability directory](/docs/for-ai/capability-interfaces.md).
4. With the user's intended action, POST /messages. Read [sendMessage](/docs/for-ai/operations/sendMessage.md) and its linked request schema. Use the endpoint ID and message version you discovered, not the illustrative ID below.

```json
{"target":{"type":"ENDPOINT","id":"port1/principals/example/endpoints/example-light"},"message":{"header":{"namespace":"port1/systems/zero/capability-interfaces/power","name":"turn-on","version":"1.0"},"body":{}}}
```

The response's messageId identifies dispatch. It is not proof of physical state. Do not cut JSON with head -c. GET /endpoints?id=<URL-encoded-endpoint-id>&expand=interfaces.attributes&forceDeviceAttributeQuery=true to request permitted device-backed state. Inspect attributes and partial errors. Check sampledAt against the command time and the capability version. sampledAt is the source-reported time, not the fetch time; an absent timestamp means freshness is unknown. Use [enumerateEndpoints and its linked components](/docs/for-ai/operations/enumerateEndpoints.md) for exact response shapes. Report returned device state separately from dispatch acceptance. Stale/unavailable state means unknown, and user confirmation may be necessary for a physical device.

For first setup, test one explicitly selected safe light. Do not turn off all homes as a connectivity check. See [lighting](/docs/for-ai/guides/lighting.md), [first setup](/docs/for-ai/guides/first-setup.md) and [authorization rules](/docs/for-ai/guides/authorization-rules.md).
