#!/usr/bin/env bash

# Go into the script directory
cd "$( dirname "${BASH_SOURCE[0]}" )"

# Install global dependencies
npm install --global gulp rollup

# build front end

cd app/front-end

npm install
./setup.sh
gulp template
gulp style
rollup -c rollup.dev.js

cd ..

# intall backend dependencies
npm install
