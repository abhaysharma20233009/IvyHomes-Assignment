
import api from "./api";

export async function getListings({
  limit = 50,
  offset = 0,
  locality,
  bhk,
  property_type,
} = {}) {
  const params = {
    limit,
    offset,
  };

  // These filters are verified to work on the actual listings API.
  if (locality) {
    params.locality = locality;
  }

  if (bhk) {
    params.bhk = bhk;
  }

  if (property_type) {
    params.property_type = property_type;
  }

  const response = await api.get("/v1/listings/", { params });

  return response.data;
}
