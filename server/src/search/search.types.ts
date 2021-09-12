export interface SearchUserQueryParams {
  index?: string;
  limit?: string;
  query?: string;
}

export interface SearchApartmentQueryParams {
  maxLat?: string;
  minLat?: string;
  maxLng?: string;
  minLng?: string;
  limit?: string;
  index?: string;
  realtorId?: string;
  minMonthlyPrice?: string;
  maxMonthlyPrice?: string;
  minFloorAreaSize?: string;
  maxFloorAreaSize?: string;
  minNumberOfRooms?: string;
  maxNumberOfRooms?: string;
}
