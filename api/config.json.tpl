{
  "domain": {
    "dev": "localhost:3000",
    "test": "api-pipeline-test.dashboardhub.io",
    "production": "api-pipeline.dashboardhub.io"
  },
  "database": {
    "connection": {
        "dev": "localhost:9200",
        "test": "localhost:9200",
        "prod": "localhost:9200"
    },
    "environments": {
      "table": "pipelinedashboard-environments"
    },
    "deploys": {
      "table": "pipelinedashboard-deploys"
    },
    "pings": {
      "table": "pipelinedashboard-pings"
    }
  }
}