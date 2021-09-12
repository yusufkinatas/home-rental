import { appConstants } from '@constants/appConstants';
import axios from 'axios';
import { stringifyUrl } from 'query-string';
import { Location } from 'types';

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<Location | undefined> => {
  const url = stringifyUrl({
    url: appConstants.GOOGLE_GEOCODE_API_URL,
    query: {
      latlng: `${latitude},${longitude}`,
      key: appConstants.GOOGLE_PLACES_API_KEY,
      language: 'en'
    }
  });

  const { data } = await axios.get(url);

  if (data.status === 'OK') {
    return {
      lat: latitude,
      lng: longitude,
      address: data.results[0]?.formatted_address
    };
  }
};
