import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  return ddb.scan();
}

export const response = (ctx) => ctx.result;