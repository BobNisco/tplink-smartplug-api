# TP-Link Smartplug API 💡

A nodejs/express API for interfacing with your TP-Link Smart Plugs

## Up and running in 120 seconds 🚀

* Clone this repo
* `yarn` or `npm install`
* Create a file called `my-plugs.js` in the project directory and export an array of IP addresses of your TP-Link Smart Plugs
* `yarn dev` or `npm run dev` to run the server in dev mode with hot-reloading on port `8600`
* Send a POST request (example uses cURL) to turn all of your lights on! ✨

```
curl -X POST \
  http://127.0.0.1:8600/ \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'command=on&all=true'
```

## What this project provides 💻

* An easy API to control _all_ of your TP-Link Smartplugs at once
* A flexible, IP-address based API for controlling only certain plugs at a time
* An exhaustive list of commands supported by the TP-Link Smartplugs

### Special Thanks

I wanted to give a big shout out to GitHub user [softScheck](https://github.com/softScheck)'s and their [tplink-smartplug](https://github.com/softScheck/tplink-smartplug) Python Library and their [awesome write up](https://www.softscheck.com/en/reverse-engineering-tp-link-hs110/) about how they reverse-engineered these plugs
