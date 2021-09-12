import { apiClient } from './apiClient';
import { Apartment, Location } from 'types';
import { stringifyUrl } from 'query-string';

export interface CreateApartmentParams {
  name: string;
  description: string;
  floorAreaSize: number;
  monthlyPrice: number;
  numberOfRooms: number;
  location: Location;
}

export interface UpdateApartmentParams extends CreateApartmentParams {
  isRented: boolean;
}

export interface SearchApartmentQueryParams {
  maxLat?: number;
  minLat?: number;
  maxLng?: number;
  minLng?: number;
  realtorId?: string;
  minMonthlyPrice?: number;
  maxMonthlyPrice?: number;
  minFloorAreaSize?: number;
  maxFloorAreaSize?: number;
  minNumberOfRooms?: number;
  maxNumberOfRooms?: number;
}

export class ApartmentService {
  public static getApartments = {
    getKey: (
      pageIndex: number,
      previousPageData: Apartment[] | null,
      params?: SearchApartmentQueryParams
    ) => {
      if (previousPageData && !previousPageData.length) return null;
      if (!params) return null;

      const limit = 10;

      return stringifyUrl(
        {
          url: '/search/apartment',
          query: {
            limit,
            index: pageIndex,
            ...params
          }
        },
        { skipEmptyString: true, skipNull: true }
      );
    }
  };

  public static createApartment = async (params: CreateApartmentParams) => {
    const { data } = await apiClient.post<Apartment>('/apartment', params);

    return data;
  };

  public static updateApartment = async (
    id: string,
    params: UpdateApartmentParams
  ) => {
    const { data } = await apiClient.put<Apartment>(`/apartment/${id}`, params);

    return data;
  };

  public static deleteApartment = async (id: string) => {
    const { data } = await apiClient.delete<Apartment>(`/apartment/${id}`);

    return data;
  };
}
