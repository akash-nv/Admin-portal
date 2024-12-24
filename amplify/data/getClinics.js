// import { util } from '@aws-appsync/utils';
export function request(ctx) {
  const { limit = 10, nextToken } = ctx.args;
  return { operation: 'Scan'};
}


export async function response(ctx) {
  // return ctx.result.items;

  const clinics = ctx.result.items;

  // Step 2: Extract owner IDs
  const ownerIds = Array.from(new Set(clinics.map((clinic) => clinic.clinicOwnerId).filter(Boolean)));

  if (ownerIds.length === 0) {
    // If no owners, return clinics as is
    return clinics.map((clinic) => ({ ...clinic, ownerDetails: null }));
  }

  // Step 3: Fetch owner details using BatchGetItem
  const batchParams = {
    RequestItems: {
      'Doctor-5xlsib7ig5e23fcrhee2jtjizi-hdev': { // Use the actual Doctor table name here
        Keys: ownerIds.map((id) => ({ id })), // Map owner IDs to keys
      },
    },
  };

  const ownerResult = await dynamoDB.batchGet(batchParams).promise();

  // Step 4: Map owners by ID for quick lookup
  const ownerMap = ownerResult.Responses['Doctor-5xlsib7ig5e23fcrhee2jtjizi-hdev'].reduce(
    (acc, owner) => {
      acc[owner.id] = owner;
      return acc;
    },
    {}
  );

  // Step 5: Enrich Clinics with owner details
  const enrichedClinics = clinics.map((clinic) => ({
    ...clinic,
    ownerDetails: ownerMap[clinic.owner] || null, // Add owner details or null if not found
  }));

  return enrichedClinics;
}