export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface IApartment {
  name: string;
  description: string;
  floorAreaSize: number;
  monthlyPrice: number;
  numberOfRooms: number;
  location: Location;
  dateAdded: Date;
  realtorId: string;
  isRented: boolean;
}

export interface CreateApartmentBody {
  name: string;
  description: string;
  floorAreaSize: number;
  monthlyPrice: number;
  numberOfRooms: number;
  location: Location;
  isRented: boolean;
}
