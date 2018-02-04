# Get up and running in minutes without installing anything!

From the **DashboardHub** Team...
> Thank you for showing an interest in **DashboardHub**. We are currently in an `ALPHA` stage, your feedback would be much appreciated. Feel free to create an [Issue](https://github.com/DashboardHub/PipelineDashboard/issues) on **GitHub**

## 1. Log in

Please log in with your GitHub account by clicking on the top right of the page.

![Log in](https://user-images.githubusercontent.com/624760/35776153-1fbf824e-098f-11e8-8c2e-8555a53e2a6d.png)

## 2. Create an Environment

Once logged click on `Add Environment`. `Type` and `Title` are both required, other fields are optional, however we strongly recommend adding a logo url. 

*Note: please read the `help` section on **environment types** to find out more*

![Add environment](https://user-images.githubusercontent.com/624760/35776140-d516c2fc-098e-11e8-96e7-ac6342ecbe36.png)

Once successfully created, you will be redirected to the **Overview** page for that environment.

![Environment overview page](https://user-images.githubusercontent.com/624760/35776188-eda4d862-098f-11e8-9b5b-2599302b7d00.png)

The **Overview** page will show the information you have just used to create the **environment**, below that will be a progress bar of the **pipeline** status and below that will be the example `curl` commands to *beacon* the data to **DashboardHub**.

## 3. Beacon deploy / release data

No need to install anything on your computer or server, beacon data with a `POST` request. Our examples are using `curl`.

```bash
curl -XPOST -H "Content-Type: application/json" -d '{ "release":"{RELEASE-VERSION}" }' \
  https://api-pipeline-test.dashboardhub.io/environments/{ENVIRONMENT-ID}/deployed/{TOKEN-ID}/{PIPELINE-STATE}
``` 
