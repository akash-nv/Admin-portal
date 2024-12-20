import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  return ddb.scan({
    TableName: ctx.stash.tableName || "AdminClinicTable",
  });
}

export const response = (ctx) => ctx.result;