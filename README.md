# Serverless django using CDK

App -> contains the django code.
App/layer -> requirements.txt for layer
Infra -> CDK, pointing to app and layer, uses docker build to package python layer

## To smash it up there

```
cdk deploy
```

Job's a good'ne.