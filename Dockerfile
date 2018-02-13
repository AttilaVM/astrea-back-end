FROM node:8.9.4

ENV APP_ROOT /home/node/astrea
ENV PORT 3000

WORKDIR $APP_ROOT

ADD . $APP_ROOT

RUN  $APP_ROOT/init.sh

EXPOSE $PORT

ENTRYPOINT ["/home/node/astrea/start.sh"]
