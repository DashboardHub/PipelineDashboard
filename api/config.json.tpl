{
  "domain": {
    "dev": "localhost:3000",
    "test": "api-pipeline-test.dashboardhub.io",
    "production": "api-pipeline.dashboardhub.io"
  },
  "dynamodb": {
    "environments": {
      "table": "pipelinedashboard-environments"
    },
    "deployed": {
      "table": "pipelinedashboard-deployed",
      "ttl": 8035200
    },
    "pinged": {
      "table": "pipelinedashboard-pinged",
      "ttl": 604800
    },
    "projects": {
      "table": "pipelinedashboard-projects"
    }
  },
  "offline": {
    "region": "localhost",
    "endpoint": "http://localhost:8000"
  },
  "envars": {
    "AUTH0_CLIENT_ID": "{{ AUTH0_CLIENT_ID }}",
    "AUTH0_CLIENT_SECRET": "{{ AUTH0_CLIENT_SECRET }}"
  }
}
