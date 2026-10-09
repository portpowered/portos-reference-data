# Control vacuums and cleaning rooms

Find the robot endpoint and inspect its robotic-vacuum-cleaner and related capability declarations in [the directory](/docs/for-ai/capability-interfaces.md). Supported operations vary by provider; do not infer room cleaning, scheduling or modes from a device name.

Use supported start/stop/mode schemas and full IDs. Spatial cleaning targets the robot endpoint with its supported room/zone payload; an endpoint group is not automatically a robot room. Check constraints and [dispatch semantics](/docs/for-ai/guides/using-the-api.md). Query fresh status afterward; accepted work is not completed cleaning. Ask for clarification when room mappings are ambiguous.
