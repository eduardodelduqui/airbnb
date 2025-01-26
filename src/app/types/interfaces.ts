export type Amenities = Record<string, string[]>;
export type RoomImages = string[];
export type RoomDetails = Record<string, string>;
export interface ICategory {
  id: string;
  image: string;
  text: string;
  url: string;
}

export interface IGuestsNumber {
  adults?: number;
  childs?: number;
  infants?: number;
  pets?: number;
}

export interface IListing {
  id: string;
  title: string;
  images: RoomImages;
  city: string;
  subtitle: string;
  district: string;
  country: string;
  altitude: string;
  distance: string;
  dayStart: string;
  dayEnd: string;
  month: string;
  price: string;
  isNight: boolean;
  rating: string;
  category: string;
  popular: boolean;
  reviews: string;
  allPlace: boolean;
  minNumberGuests: IGuestsNumber;
  maxNumberGuests: IGuestsNumber;
  minimumRangeDays: number;
  details: RoomDetails;
  description: string;
  host: string;
  amenities: Amenities;
}

export interface IHost {
  id: string;
  name: string;
  years: string;
  superhost: boolean;
  image: string;
}
