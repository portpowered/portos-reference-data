# Control lights and distinguish switches and plugs

Start with authorized endpoint discovery and inspect capability declarations. A room name can be ambiguous; select by full ID and group path or ask the user. A power-capable plug or switch is not automatically a light.

For one bulb, read its power/brightness/color message schemas in [the capability directory](/docs/for-ai/capability-interfaces.md). Use the exact namespace, version, message name, units and constraints returned. [The quickstart](/docs/for-ai/guides/quickstart.md) shows the generic dispatch envelope.

For “all lights,” use [endpointQuery](/docs/for-ai/operations/endpointQuery.md): POST /endpoint-query with endpoint:read. Its results include readable shared endpoints from other owners. Start with the LIGHT and LIGHTBULB types below, then limit the results to the user's requested home or group.

```json
{
  "query": {
    "or": [
      {"match": {"key": "type", "value": "LIGHT"}},
      {"match": {"key": "type", "value": "LIGHTBULB"}}
    ]
  },
  "paginationContext": {"maxResults": 25}
}
```

For a room, first resolve its full group ID using [group discovery](/docs/for-ai/guides/managing-groups.md). Intersect the type predicate with `{"match":{"key":"groupId","value":"<resolved-full-group-id>"}}` inside query.and. This additionally requires group:read and permission to read that group. A group filter uses its returned member endpoints; resolve the requested nested groups as needed and deduplicate full endpoint IDs. Reading a group does not grant control of its members.

Repeat the same query, page size and authenticated grant with paginationContext.nextToken from each response. Continue until that token is absent, including after an empty page. Disabled endpoints are excluded by default. Inspect declared capabilities for the selected endpoints and exclude unsupported targets; do not broaden the selection to every power-capable plug or switch. Freeze the discovered target set before dispatch and report each result.

A batch can partially succeed. Report selected, accepted, failed and unresolved targets separately. For fresh readback, repeat endpointQuery with expand:["interfaces.attributes"] and forceDeviceQuery:true. Inspect observation sample times and response errors before claiming all lights changed. A lost response does not justify repeating relative brightness adjustments. See [authorization rules](/docs/for-ai/guides/authorization-rules.md).
