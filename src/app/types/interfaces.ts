export interface Category {
    id: string;
    image: string;
    text: string;
    url: string;
}

export interface Listing {
    id: string;
    title: string;
    images: string[];
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
    details: Record<string, unknown>;
    description: string;
    host: string;
    amenities: Record<string, unknown>;
}

export interface Host {
    id: string;
    name: string;
    years: string;
    superhost: boolean;
    image: string;
}