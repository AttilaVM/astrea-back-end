#!/usr/bin/env bash

/etc/init.d/postgresql start

cd "$( dirname "${BASH_SOURCE[0]}" )"

cd app

# generate config file

configTemplate=$(cat config.json-example)

config=$(echo "$configTemplate" \
						 | sed "s/DB_USER/$DB_USER/g; s/DB_ID/$DB_ID/g; s/DB_PASS/$DB_PASS/g; s/DB_DIALECT/$DB_DIALECT/g; ; s/DB_HOST/$DB_HOST/g")

echo "$config" > config.json

# start app
./astrea
