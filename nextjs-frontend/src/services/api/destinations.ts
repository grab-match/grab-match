import apiHandler from "./apiHandler";
import { API_PATHS } from "./paths";

export const destinations = ({
  latitude,
  longitude,
  start_time = "16:00",
  duration = 6,
}: {
  latitude: number;
  longitude: number;
  start_time?: string;
  duration?: number;
}) => {
  return apiHandler.get(API_PATHS.DESTINATIONS.ROOT, {
    params: {
      latitude,
      longitude,
      start_time,
      duration,
    },
  });
};

export const destinationDetail = (id: string) => {
  return apiHandler.get(`${API_PATHS.DESTINATIONS.DETAIL}/${id}`);
};

export const destinationPackageDetail = (id: string) => {
  return apiHandler.get(`${API_PATHS.DESTINATIONS.PACKAGE}/${id}`);
};

export const destinationGenerated = (id: string) => {
  return apiHandler.get(`${API_PATHS.DESTINATIONS.GENERATED}/${id}`);
};
