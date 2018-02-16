[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

<img style="margin-bottom:55px" align="right" src="./doc/img/logo.png" alt="Astrea logo which is a stylized image of the constellation Virgo">

# Astrea Scientific Volume Renderer (Back-End)

This back-end is in an very early stage of development, thankfully the [front-end](https://github.com/AttilaVM/astrea-front-end) exposes all of its functionality without this, except sample saving.

## Use Docker (recommended)

This is the most easiest and stable way to work with Astrea.

``` shell
docker run -p 8080:3000 attilavm/astrea:easy
```

The database is included in the image.

## Set up mannualy

Clone this repo, install node `v.8` or higher, fill `config.json-example`, then rename it to `config.json`, and start the app with the `app/astrea` script.

# Warnign

You should not use this app on a unsecure network, unless you like to live dangerously, then be my guest.
