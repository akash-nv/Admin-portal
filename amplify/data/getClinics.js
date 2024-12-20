import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  return ddb.scan({
    TableName: "Clinic-5xlsib7ig5e23fcrhee2jtjizi-hdev",
  });
}

export const response = (ctx) => {
    if (ctx.result && ctx.result.Items) {
        return ctx.result.Items; // Correctly return the list of items
      }
      return []; // Return an empty array if no items are found
}