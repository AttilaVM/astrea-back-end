#!/bin/bash

createuser $DB_USER && createdb -O $DB_USER $DB_ID \
		&& psql -c "ALTER USER node WITH PASSWORD '$DB_PASS';"
