import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { limit = 10, nextToken } = ctx.args;
  return { operation: 'Scan'};
}

/**
* Returns the scanned items
* @param {import('@aws-appsync/utils').Context} ctx the context
* @returns {*} a flat list of results from the Scan operation
*/
export async function response(ctx) {
  const clinics = ctx.result.items;

  const ownerIds = Array.from(new Set(clinics.map((clinic) => clinic.owner).filter(Boolean)));

  if (ownerIds.length === 0) {
    return ctx.result.items; // No owners to fetch
  }

  const batchParams = {
    RequestItems: {
      Doctor: {
        Keys: ownerIds.map((id) => ({ id })), // Map IDs to DynamoDB keys
      },
    },
  };

  const batchResult = await util.dynamoDB.batchGet(batchParams).promise();

  // Map owners by ID for quick lookup
  const ownersMap = batchResult.Responses.OwnersTable.reduce((map, owner) => {
    map[owner.id] = owner;
    return map;
  }, {});

  const enrichedClinics = clinics.map((clinic) => ({
    ...clinic,
    ownerDetails: ownersMap[clinic.owner] || null, // Add owner details or null
  }));

  return enrichedClinics;
}