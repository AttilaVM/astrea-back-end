FROM node:8.9.4

ENV CLIENT_AUTH_FILE "/etc/postgresql/9.4/main/pg_hba.conf"

ENV APP_ROOT /home/node/astrea
ENV PORT 3000
ENV DB_USER node
ENV DB_ID node
ENV DB_PASS "pass"
ENV DB_DIALECT postgres

WORKDIR $APP_ROOT

ADD . $APP_ROOT

RUN $APP_ROOT/init.sh

EXPOSE $PORT

CMD ["/home/node/astrea/start.sh"]
