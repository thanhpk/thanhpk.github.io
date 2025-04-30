---
title: 'Hostname is exists.ptr.local'
description: 'Hostname on MacOS is exists.ptr.local'
pubDate: Apr 30 2025'
---

Did your hostname looks something like this?

```bash
> hostname
192.168.71.102.non-exists.ptr.local
```

I was expecting `hostname` to return `URMAC` but it doesn't. What the hell is
`.non-exists.ptr.local`?. Is this somekind of magic caused by Warp,
Tailscale or my wifi configuration?. I searched for
"non-exists.ptr.local" in Google and got 0 result. What!

Turn our, there are 3 kinds of hostname in MacOs (thank to ChatGPT).

```bash
> scutil --get HostName
> scutil --get LocalHostName
> scutil --get ComputerName
```

* HostName: Used for the system's public name (e.g., for SSH).
* LocalHostName: Used for Bonjour/mDNS (this is what you'll see in .local).
* ComputerName: What appears in the UI (like AirDrop, System Settings,
  etc.)

The `hostname` command use the first kind of hostname and my machine
does not have a one.
```bash
> scutil --get HostName
HostName: not set
```

OK, I will set one
```bash
> sudo scutil --set HostName URMAC
```

And it works
```bash
> hostname
URMAC
```
