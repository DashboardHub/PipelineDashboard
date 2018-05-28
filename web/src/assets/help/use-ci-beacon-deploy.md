# How do I use CI to beacon deploy?
You don't need to install anything on your computer or server - simply beacon data with a `POST` request.

Our examples are using `curl`. Here is the template command:

```bash
curl -XPOST -H "Content-Type: application/json" -d '{ "release":"{RELEASE-VERSION}" }' \
  https://api-pipeline.dashboardhub.io/environments/{ENVIRONMENT-ID}/deployed/{TOKEN-ID}/{PIPELINE-STATE}
```
*Note: Use your release version. For example can append the TravisCI build number*

However, **DashboardHub** generates the exact `curl` commands pre-populated with the relevant IDs and tokens to *beacon* the data to **DashboardHub**. Treat tokens as passwords. To access these commands, follow the steps below:

1) Click the key icon on the top left of the page.

![token icon](https://user-images.githubusercontent.com/21239137/40327650-99532336-5d3b-11e8-9dbe-e7fd40e9ada8.png)

2) Click the green "example usage" button

![example usage](https://user-images.githubusercontent.com/21239137/40327566-5b745292-5d3b-11e8-9490-84f88251716b.png)


You will then see the exact commands, as below:

![modal after example usage](https://user-images.githubusercontent.com/21239137/40327043-574dab20-5d39-11e8-9802-0cccd0b510be.png)
