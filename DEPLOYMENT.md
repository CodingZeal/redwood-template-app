# Deployment info

## Heroku requirements

Because redwood uses functions and the client as two seperate services there is some additional config required beyond setting up a basic node deploy on heroku.

1. Configure NGINX

- NGINX Buildpack
  - Sometimes will fail due to network latency or other issues. Just redeploy if this happens.
  - Required to proxy api request
