import apiHandler from "./apiHandler";
import { API_PATHS } from "./paths";

export const authSocial = (tokenId?: string) => {
  return apiHandler.post(API_PATHS.AUTH.SOCIAL, {
    tokenId,
  });
};

export const userDetail = (id: string) => {
  return apiHandler.get(`${API_PATHS.USERS.DETAIL}/${id}`);
};

export const userMatchPercentage = (id: string) => {
  return apiHandler.get(
    `${API_PATHS.USERS.MATCH_PERCENTAGE}/${id}/match_percentage`
  );
};
