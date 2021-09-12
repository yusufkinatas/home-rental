/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface*/

import { CompositeScreenProps } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateUserParams, UpdateUserParams } from '@services/UserService';

export type RootStackParamList = {
  Landing: undefined;
  Drawer: NavigatorScreenParams<DrawerParamList> | undefined;
  ApartmentDetail: { apartmentId: string };
  CreateApartment: undefined;
  EditApartment: { apartmentId: string };
  CreateUser: { createUser: (params: CreateUserParams) => Promise<void> };
  EditUser: {
    user: User;
    updateUser: (id: string, params: UpdateUserParams) => Promise<void>;
  };
  ApartmentFilters: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type DrawerParamList = {
  Apartments: { view: 'map' | 'list' };
  Users: undefined;
};

export type CompositeDrawerScreenProp<Screen extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export enum UserRole {
  CLIENT = 0,
  REALTOR = 1,
  ADMIN = 2
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Apartment {
  _id: string;
  name: string;
  description: string;
  floorAreaSize: number;
  monthlyPrice: number;
  numberOfRooms: number;
  location: Location;
  dateAdded: string;
  isRented: boolean;
  realtorId: string;
}
