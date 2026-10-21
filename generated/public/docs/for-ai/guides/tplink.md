# Connect TP-Link Kasa

Link your TP-Link Kasa account to Port OS to turn Kasa plugs and bulbs on and off and to set brightness, colour and colour temperature. You sign in with your own TP-Link email and password, and with the verification code TP-Link sends if your account asks for one. Port OS stores the resulting session token, not your password.

You must choose a region when you connect. Port OS never picks one for you, because TP-Link keeps each account on one regional cloud and a session from one region is not accepted by another.

## Choose your region [#region]

Choose the region your TP-Link Kasa account is in. This guide covers Kasa only, not Tapo.

| Region | Choose it when your account is in |
| --- | --- |
| `us` | The United States, and other countries TP-Link serves from its US cloud |
| `eu` | Europe, served from TP-Link's EU cloud |
| `apac` | Asia Pacific, served from TP-Link's Asia Pacific cloud |
| `global` | Only if TP-Link support told you your account is on the global cloud |

If you are not sure, pick one and connect. If your account is in a different region, Port OS tells you it "returned a device served from outside" the region you chose and to "reconnect and choose the region that matches your TP-Link account". Connect again with another region until the error stops.

## Connect

1. Open the TP-Link connect screen in Port OS.
2. Choose your region from the list.
3. Enter your TP-Link email and password, and choose Connect.
4. If TP-Link asks for a verification code, enter the code it sends you.
5. Port OS lists your plugs and bulbs and shows TP-Link as connected.

## Existing connections

Connections made before regions existed are moved to `us`, the only region Port OS could reach then, the next time the server starts. If your account is in another region, delete the connection and connect again with the right region. A connection keeps its region: to change it, connect again.

## Troubleshooting

- **"TP-Link returned a device served from outside the us region; reconnect and choose the region that matches your TP-Link account."** (the name of your chosen region appears in place of `us`). TP-Link answered from a different regional cloud than the one you chose, so your account is in another region. Delete the connection, connect again and choose the region of your account.
- **"regionalizationId is required".** The connect request named no region. Choose one from the list.
- **"Unknown TP-Link regionalization".** The region is not one of `us`, `eu`, `apac` or `global`. Choose from the list.
- **The sign-in is refused or the code is rejected.** Check the email and password in the Kasa app, and enter the newest verification code.
- **`AUTH_LINK_NOT_READY`.** The connection has no valid region stored. Delete it and connect again, choosing a region.
