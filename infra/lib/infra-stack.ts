import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs';
import * as python from '@aws-cdk/aws-lambda-python-alpha'

import path = require('path');
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const pythonDependencies = new python.PythonLayerVersion(this, 'MyLayer', {
      entry: '../app/layer', // point this to your library's directory
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_8]
    })
    const fn = new lambda.Function(this, 'DjangoServerless', {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'mysite.wsgi.lambda_handler',
      code: lambda.Code.fromAsset('../app/mysite'),
      layers: [pythonDependencies]
    });

    const api = new LambdaRestApi(this, 'myapi', {
      handler: fn,
      proxy: true
    });


  }
}
