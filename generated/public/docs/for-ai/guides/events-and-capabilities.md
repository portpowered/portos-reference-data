# Events, capabilities and messages

Discover what a device can do, send a supported command, and interpret its observations. You need a signed-in account or an OAuth token with the operation's required scopes and permission on the target device.

## Inspect the endpoint contract

An endpoint is a device addressed by its full ID. Its interfaces declare capability namespaces, versions, supported messages and supported attributes. A plugin connects that endpoint to a provider such as Alexa, Tuya or Philips Hue. Multiple plugin routes can contribute to one endpoint.

Enumerate your endpoints using the [endpoint API](/docs/for-ai/operations/enumerateEndpoints.md). Inspect the returned interfaces before choosing a command. A capability namespace such as `port1/systems/zero/capability-interfaces/power` identifies a contract; its version selects the schema. Read the [capability reference](/docs/for-ai/capability-interfaces.md) for exact fields and constraints.

A declared message subset limits which commands are available. Do not assume that every command in a capability is implemented by every device. An omitted subset uses the versioned capability contract. An explicitly empty subset advertises no messages.

## Send a message

A message has a header identifying its capability namespace and message name, and a body that follows the message schema. For a device that advertises power `turn-on`, the payload is:

```json
{
  "header": {
    "namespace": "port1/systems/zero/capability-interfaces/power",
    "name": "turn-on"
  },
  "body": {}
}
```

Use the [send-message operation](/docs/for-ai/operations/sendMessage.md) for the enclosing request and target format. Choose the full endpoint ID returned by discovery. Dispatch only a supported message to a device you intend to operate.

## Read attributes and events

Attributes describe observations, such as the power capability's `power` attribute with a value of `ON` or `OFF`. They differ from command messages: accepting `turn-on` does not prove that the device is on. Read the device's reported attributes after dispatch when the connection supports observation.

Events communicate changes through the event transport supported by your client. An incoming command asks a device to act; an outgoing capability message reports an event. Match namespace, version, name and schema when interpreting an event. See [MCP setup](/docs/for-ai/guides/connect-agent.md) and [the API guide](/docs/for-ai/guides/using-the-api.md) for client and transport details.

When a current power observation is unavailable, offer explicit On and Off commands that the endpoint supports rather than inventing a current state. This also applies when a connection normally reports state but a read fails. When power is known, use that observation for the toggle. Keep pending actions, command acceptance and confirmed observations separate; an accepted command with missing readback remains unconfirmed.

## Recover from missing data or failures

An empty attribute list does not mean the device is off. A failed read leaves the state unknown. A timeout may follow a successful physical action: check observations before repeating a command, especially relative actions. For a permission error, check both OAuth scopes and the resource grant in [authorization rules](/docs/for-ai/guides/authorization-rules.md). If a command is absent, choose one the endpoint advertises or reconnect the provider when discovery is out of date.
