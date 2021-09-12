/* eslint-disable indent */
import React, { useEffect } from 'react';
import { createContext, FC, useContext, useState } from 'react';
import {
  ApartmentService,
  CreateApartmentParams,
  SearchApartmentQueryParams,
  UpdateApartmentParams
} from '@services/ApartmentService';
import { Apartment } from 'types';
import useSWRInfinite from 'swr/infinite';
import { useProfile } from './profile';

interface IApartmentsContext {
  apartments: Apartment[];
  isLoading: boolean;
  loadMoreApartments: () => void;
  searchParams: SearchApartmentQueryParams | undefined;
  setSearchParams: React.Dispatch<
    React.SetStateAction<SearchApartmentQueryParams | undefined>
  >;
  updateApartment: (id: string, params: UpdateApartmentParams) => Promise<void>;
  findApartmentById: (id: string) => Apartment | undefined;
  createApartment: (params: CreateApartmentParams) => Promise<void>;
  deleteApartment: (id: string) => Promise<void>;
  isLoadingInitialData: boolean;
}

const ApartmentsContext = createContext<IApartmentsContext>(
  {} as IApartmentsContext
);

export const ApartmentsContextProvider: FC = ({ children }) => {
  const [searchParams, setSearchParams] =
    useState<SearchApartmentQueryParams>();

  const { user } = useProfile();

  const { data, isValidating, setSize, size, mutate } = useSWRInfinite<
    Apartment[]
  >(
    user
      ? (index, previousPageData) =>
          ApartmentService.getApartments.getKey(
            index,
            previousPageData,
            searchParams
          )
      : () => null
  );

  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    if (data && !isValidating) {
      setApartments(data?.flat());
    }
  }, [data, isValidating]);

  const loadMoreApartments = () => setSize(size + 1);

  const findApartmentById = (id: string) => {
    return apartments.find((a) => a._id === id);
  };

  const createApartment = async (params: CreateApartmentParams) => {
    const newApartment = await ApartmentService.createApartment(params);

    setApartments((apartments) => [...apartments, newApartment]);
  };

  const updateApartment = async (id: string, params: UpdateApartmentParams) => {
    const updatedApartment = await ApartmentService.updateApartment(id, params);

    const apartmentIndex = apartments.findIndex((a) => a._id === id);

    if (apartmentIndex === -1) return;

    setApartments((apartments) => {
      return [
        ...apartments.slice(0, apartmentIndex),
        updatedApartment,
        ...apartments.slice(apartmentIndex + 1, apartments.length)
      ];
    });
  };

  const deleteApartment = async (id: string) => {
    await ApartmentService.deleteApartment(id);

    mutate();
  };

  return (
    <ApartmentsContext.Provider
      value={{
        apartments,
        isLoading: isValidating,
        loadMoreApartments,
        searchParams,
        setSearchParams,
        updateApartment,
        findApartmentById,
        createApartment,
        deleteApartment,
        isLoadingInitialData: size === 1 && isValidating
      }}
    >
      {children}
    </ApartmentsContext.Provider>
  );
};

export const useApartments = () => useContext(ApartmentsContext);
