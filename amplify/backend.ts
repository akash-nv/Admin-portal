import { defineBackend } from '@aws-amplify/backend';
import { aws_dynamodb } from "aws-cdk-lib";
import { auth } from './auth/resource';
import { data } from './data/resource';

export const backend = defineBackend({
  auth,
  data,
});