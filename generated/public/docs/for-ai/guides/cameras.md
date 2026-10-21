# Read camera captures and streams

Camera access requires both the operation scope and authorization for the selected camera/action. A light-control grant does not imply imagery access. Discover camera/snapshot capabilities from [the directory](/docs/for-ai/capability-interfaces.md) and use only declared message schemas.

Prefer an on-demand capture when the user asks for a current image. Send get-snapshot with responseFormat BASE64 to receive the image inline, or URL for a short-lived Port OS link (an error says when media hosting is unavailable and BASE64 is needed). The reply carries image and timeOfSample; validate timeOfSample and, for a URL, its expiresAt. An existing capture may be old even when its download URI is new. Confirm the media is actually retrievable before describing it as viewed. If expired or stale, request a new permitted capture or explain the limitation. Streams require the declared lifecycle/transport, not an invented snapshot API.

Read [authorization rules](/docs/for-ai/guides/authorization-rules.md) and [async outcomes](/docs/for-ai/guides/using-the-api.md).
