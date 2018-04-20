# The **environment** `type` configures the Pipeline flow.

*Note: You can update the environment `type` at anytime*.

## Environment types

| Type | Example | Description |
| :--- | :--- | :--- |
| `build` | Library, Dependency or Assets | This *type* only does the `build` part of the **pipeline** |
| `deploy` | Deploy / Release Application or Platform | This *type* only does the `deploy` part of the **pipeline** |
| `build-deploy` | Both of the above | This *type* does both of the above **pipeline**, with the `build` first, then `deploys` if the build was successful |
