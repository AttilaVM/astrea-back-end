#!/usr/bin/env bash

function info() {
		echo "\n\n$1\n\n"
}

apt-get update \
		&& info "Install system dependencies" \
		&& apt-get install -y postgresql postgresql-client \
		&& /etc/init.d/postgresql start \
		&& (su -s /bin/bash -c $APP_ROOT/postgres.sh postgres) \
		&& /etc/init.d/postgresql stop \
		&& cd "$( dirname "${BASH_SOURCE[0]}" )" \
		&& npm install --global gulp@3.9.1 rollup@0.55.5 \
		&& cd app/front-end \
		&& npm install \
		&& ./setup.sh \
		&& gulp template \
		&& gulp style \
		&& rollup -c rollup.dev.js \
		&& cd .. \
		&& npm install

# && info "Enable postgres local authentication" \
		# && cat $CLIENT_AUTH_FILE \
		#			| sed 's/peer$/local/g' \
		#			| tee $CLIENT_AUTH_FILE \
