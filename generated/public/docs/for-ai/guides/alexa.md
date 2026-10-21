# Connect Amazon Alexa

Link your Amazon account to Port OS to control the devices your Alexa account can see and to read their state. You link with a short code: Port OS shows a code, you enter it on Amazon's own page, and Amazon tells Port OS the link is approved. Port OS never sees your Amazon password.

You must choose a region when you connect. Port OS never picks one for you, because each Amazon marketplace belongs to one regional Alexa service, and an account is only known to the region of its marketplace.

## Choose your region [#region]

Choose the region of the Amazon marketplace you sign in to for Alexa, the site you use to open the Alexa app or shop.

| Region | Choose it when your Amazon site is |
| --- | --- |
| `na` | amazon.com, and also amazon.ca, amazon.com.mx and amazon.com.br |
| `eu` | amazon.co.uk and the European marketplaces such as amazon.de, amazon.fr, amazon.it, amazon.es, amazon.nl, amazon.se, amazon.pl and amazon.ie, plus amazon.com.tr, amazon.ae, amazon.sa and amazon.eg |
| `fe` | amazon.co.jp |

Only these marketplaces are supported. Other Amazon marketplaces, such as amazon.in, amazon.com.au and amazon.sg, are not supported, and no region will connect them.

The region also decides which Amazon page you enter the code on: the `/code` page of your own marketplace's Amazon site, for example amazon.com for `na`, amazon.co.uk for `eu` and amazon.co.jp for `fe`. The connect screen shows the page for the region you choose.

## Connect

1. Open the Alexa connect screen in Port OS.
2. Choose your region from the list.
3. Port OS shows a code and the Amazon page for your region. Open that page, sign in and enter the code.
4. Return to Port OS. Port OS checks which marketplace your account belongs to, then lists your devices and shows Alexa as connected.

## Existing connections

Connections made before regions existed are moved to `na`, the only region Port OS could reach then, the next time the server starts. If your Amazon account is on another marketplace, delete the connection and connect again with the right region. A connection keeps its region: to change it, connect again.

## Troubleshooting

- **"This Amazon account belongs to the eu region, not the na region it was linked with; reconnect and choose the eu region."** (the region names change to match your account). Amazon reported that your account lives on a different marketplace than the region you chose. Nothing was connected. Start again and choose the region the message names.
- **"This Amazon account is served from outside the na region; reconnect and choose the region that matches your Amazon account."** The account's marketplace is not one the chosen region serves. Start again and choose the region of the Amazon site you use for Alexa.
- **"Alexa requires a regionalization".** The connect request named no region. Choose one from the list.
- **"Unknown Alexa regionalization".** The region is not `na`, `eu` or `fe`. Choose from the list.
- **The code is rejected or has expired.** Codes are short-lived. Start the connection again to get a new one, and enter it on the Amazon page for your region.
- **`AUTH_LINK_NOT_READY`.** The connection has no valid region stored. Delete it and connect again, choosing a region.
