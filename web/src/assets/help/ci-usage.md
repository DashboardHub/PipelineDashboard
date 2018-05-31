# CI Usage

Here are some examples of how to use **DashboardHub** `curl` commands on CI to beacon your release version number.

## CircleCI example usage

```
- run:
    name: Notify build completed
    command: |
      BUILD=$CIRCLE_BRANCH-${CIRCLE_SHA1:0:7}
      curl -H "Content-Type: application/json" \
      -d '{ "release": "'$BUILD'" }' \
      -X POST https://api-pipeline.dashboardhub.io/environments/xxxxxxxxx/deployed/xxxxxxxx/finishBuild
```

## TravisCI example usage

```
script:
  - >
    curl -H 'Content-Type: application/json'
    -d '{ "release":"v0.1.'${TRAVIS_BUILD_NUMBER}'" }'
    -X POST https://api-pipeline.dashboardhub.io/environments/62944660-2c15-11e8-978f-d3b74ee07930/deployed/${DH_TOKEN}/startBuild
```
