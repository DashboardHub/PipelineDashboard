# Get up and running in minutes without installing anything!

From the **DashboardHub** Team...
> Thank you for showing an interest in **DashboardHub**. We are currently in an `ALPHA` stage, your feedback would be much appreciated. Feel free to create an [Issue](https://github.com/DashboardHub/PipelineDashboard/issues) on **GitHub**

## 1. Log in

Please log in with your GitHub account by clicking on the top right of the page.

![Log in](https://user-images.githubusercontent.com/21239137/40269782-a1bad2b6-5b7a-11e8-8221-51298394317d.png)

## 2. Create an Environment

Once logged click on `Add Environment`. `Type` and `Title` are both required, other fields are optional, however we strongly recommend adding a logo url.

*Note: please read the `help` section on **environment types** to find out more*

![Add environment](https://user-images.githubusercontent.com/21239137/40323918-c8ef32ea-5d2e-11e8-88c1-dfe00acf3787.png)

Once successfully created, you will be redirected to the **Overview** page for that environment.

![Environment overview page](https://user-images.githubusercontent.com/21239137/40324027-2040dd14-5d2f-11e8-823a-1b2e5bb78e68.png)

The **Overview** page will show the information you have just used to create the **environment**, and a progress bar of the **pipeline** status.

## 3. Beacon deploy / release data
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
