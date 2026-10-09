# Control lights and distinguish switches and plugs

Start with authorized endpoint discovery and inspect capability declarations. A room name can be ambiguous; select by full ID and group path or ask the user. A power-capable plug or switch is not automatically a light.

For one bulb, read its power/brightness/color message schemas in [the capability directory](/docs/for-ai/capability-interfaces.md). Use the exact namespace, version, message name, units and constraints returned. [The quickstart](/docs/for-ai/guides/quickstart.md) shows the generic dispatch envelope.

For “all lights,” include explicitly authorized shared lights and the user-requested home/group scope. Complete pagination, exclude disabled/unavailable unsupported targets as documented and deduplicate nested groups. Do not broaden the set to every power-capable endpoint. Use the existing query/dispatch contract if it supports the selection; otherwise enumerate the fixed target set and report each result.

A batch can partially succeed. Report selected, accepted, failed and unresolved targets separately. Read fresh state before claiming all lights changed. A lost response does not justify repeating relative brightness adjustments. See [authorization rules](/docs/for-ai/guides/authorization-rules.md).
