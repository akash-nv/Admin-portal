import { defineBackend } from '@aws-amplify/backend';
import { aws_dynamodb } from "aws-cdk-lib";
import { auth } from './auth/resource';
import { data } from './data/resource';

export const backend = defineBackend({
  auth,
  data,
});

// const externalDataSourcesStack = backend.createStack("MyExternalDataSources");

// const externalTable = aws_dynamodb.Table.fromTableName(
//   externalDataSourcesStack,
//   "MyExternalPostTable",
//   "AdminClinicTable"
// );


// backend.data.addDynamoDbDataSource(
//   "AdminClinicTable",
//   externalTable
// );