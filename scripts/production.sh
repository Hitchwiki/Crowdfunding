#!/bin/sh

USER_HOME=/home/simison
APP=/srv/www/hitchwiki.net/donate.hitchwiki
PORT=3000

# Set RBENV the environment, as required by Monit
export RBENV_ROOT=/usr/local/rbenv
export PATH="$RBENV_ROOT/bin:$PATH"
eval "$(rbenv init -)"

# Allow local Gem management
export GEM_HOME="$USER_HOME/.gem"
export GEM_PATH="$USER_HOME/.gem"
export PATH="$USER_HOME/.gem/bin:$PATH"


start () {
  cd $APP
  HTTPS=on BUNDLE_GEMFILE=$APP/Gemfile bundle exec rails s -d -p $PORT -e production
}

stop () {
  kill -INT $(cat $APP/tmp/pids/server.pid)
}

assets () {
  cd $APP
  bundle exec rake RAILS_ENV=production assets:precompile --trace
}

case $1 in
  start)
    echo "Starting donate.hitchwiki..."
    start
  ;;
  stop)
    echo "Stopping donate.hitchwiki..."
    stop
  ;;
  restart)
    echo "Restarting donate.hitchwiki..."
    stop
    echo "sleeping 10 seconds..."
    sleep 10
    start
  ;;
  assets)
    echo "Generating assets for donate.hitchwiki..."
    assets
    stop
    echo "sleeping 10 seconds..."
    sleep 10
    start
  ;;
  *)
  echo $"Usage: $0 {start|stop}"
  exit 1
  ;;
esac

exit 0