import React from 'react';
import Carousel from './carousel';
import { Listing } from '@/app/types/interfaces';
import Link from 'next/link';

const SubTitle: React.FC<{listing: Listing}> = ({listing}) => {
    let subtitle: string;
    if (listing.category === 'frente-praia' || listing.category === 'beira-do-lago') {
        subtitle = listing.district;
    } if (listing.category === 'vistas-incriveis') {
        subtitle = listing.subtitle;
    } if (listing.category === 'nas-alturas') {
        subtitle = `${listing.altitude} de altitude`
    } else {
        subtitle = `${listing.distance} km de distância`
    }

    return (
        <p className="text-[#6a6a6a]">{subtitle}</p>
    )
}

const FavoriteFlag: React.FC = () => {
    return (
        <div className="absolute p-3 top-0 right-0">
            <img src="/icons/favorite.svg" alt="Favorite" className="w-6 h-6" />
        </div>
    )
}

const PopularFlag: React.FC<{isPopular: boolean}> = ({isPopular}) => {
    if (isPopular) {
        return (
            /** Transformar em um grid, para melhor responsividade */
            <div className="absolute p-3 top-0 left-0">
                <div className="py-1 px-2.5 bg-white rounded-full truncate shadow-md">
                    <p className="text-sm font-semibold">Preferido dos hóspedes</p>
                </div>
            </div>
        )
    }
}

const InfoBox: React.FC<{listing: Listing}> = ({ listing }) => {
    return (
        <div className="absolute top-0 left-0 w-full">
            <PopularFlag isPopular={listing.popular}/>
            <FavoriteFlag />
        </div>
    )
}

const Card: React.FC<{listing: Listing}> = ({listing}) => {
    return (
        <Link href={`/rooms/${listing.id}`}>
            <div className="grid gap-y-3">
                <div className="relative">
                    <Carousel rounded={true} >
                        {listing.images.map((image, index) => (
                            <img className="h-full object-cover" key={index} src={image} alt="" />
                        ))}
                    </Carousel>
                    <InfoBox listing={listing}/>
                </div>
                <div className="grid gap-y-0.5 leading-[19px] text-[15px]">
                    <div className="flex justify-between">
                        <p className="font-medium text-[#000000]">{listing.city}, {listing.country}</p>
                        <div className="flex gap-1 items-center">
                            <img src="/icons/star-icon.svg" alt="Rating" className="w-3 h-3" />
                            <span>{listing.rating}</span> 
                        </div>
                    </div>
                    <SubTitle listing={listing}/>
                    <p className="text-[#6a6a6a]">{listing.dayStart} - {listing.dayEnd} de {listing.month}.</p>
                    <p className="my-1.5"><span className="font-medium">{listing.price}</span> {listing.isNight ? "noite": "dia"}</p>
                </div>   
            </div>
        </Link>
    )
}

export default Card;