import { Host, Listing } from "@/app/types/interfaces";
import BackButton from "@/components/BackButton";
import Carousel from "@/components/carousel";
import { notFound } from 'next/navigation';

const getRoomDetails = async (id: string): Promise<Listing> => {
  const response = await fetch(`http://localhost:3000/api/listings/${id}`, { cache: "no-store" });
  const room = await response.json();
  return room[0]
}

const getHostDetails = async (hostId: string): Promise<Host> => {
  const response = await fetch(`http://localhost:3000/api/hosts/${hostId}`, { cache: "no-store" });
  const host = await response.json();
  return host[0]
}

/** @TODO jogar para um módulo de funções utils */
const translateDetails = (text: string): string => {
  const translations: Record<string, string> = {
    "guests": "hóspedes",
    "bedrooms": "quartos",
    "beds": "camas",
    "bathrooms": "banheiros",
    "kitchen": "cozinha"
  }

  return translations[text]
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);
  const selectedRoom = await getRoomDetails(id);
  const hostDetails = await getHostDetails(selectedRoom.host);
  console.log(hostDetails);
  if (!selectedRoom) {
    notFound();
  }
  
  const SubTitle: React.FC<{room: Listing}> = ({room}) => {
    const prefix = room.allPlace ? "Espaço inteiro" : "Um quarto"
    const text = `${prefix} em ${room.city}, ${room.country}`
    return (
      <h2 className="font-medium">{text}</h2>
    )
  }

  const Features: React.FC<{room: Listing}> = ({room}) => {
    const { guests, bedrooms, beds, bathrooms } = room.details;
    const features = Object.entries({ guests, bedrooms, beds, bathrooms })

    return (
      <ul className="flex gap-2 flex-wrap">
        {features.map((feature, index) => {
          const [key, value] = feature;
          if (!value) {
            return;
          }

          const text = `${value} ${translateDetails(key)}`
          if (index === 0) {
            return (
              <li className="text-sm" key={index}>{text}</li>
            )
          }

          return (
            <li
              className="text-sm"
              key={index}
            >
              <span className="text-xxs">•</span>
              {text}
            </li>
          )
        })}
      </ul>
    )
  }

  const Host: React.FC<{host: Host}> = ({host}) => {
    const text = host.superhost ? `Superhost • ${host.years} anos hospedando` : `${host.years} anos hospedando`
   return (
    <div className="flex gap-4 py-6 border-t">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img className="object-cover" src={host.image} alt={host.name} />
      </div>
      <div>
        <p className="font-medium">Anfitriã(o): {host.name}</p>
        <p className="text-sm text-[#6a6a6a]">{text}</p>
      </div>
    </div>
   ) 
  }

  return (
    <main>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="relative">
            <div className="absolute top-3.5 left-4 w-9 h-9 z-10 rounded-full overflow-hidden ">
              <BackButton/>
          </div>
          <Carousel showIndicators={false} showArrows={false}>
              {selectedRoom.images.map((image, index) => (
                  <img className="h-full object-cover" key={index} src={image} alt="" />
              ))}
          </Carousel>
        </div>
        <div className="p-6">
          <h1 className="text-[26px] font-semibold text-[#222222] leading-[1.875rem]">{selectedRoom.title}</h1>
          <section className="pt-4 pb-6">
            <SubTitle room={selectedRoom} />
            <Features room={selectedRoom} />
            <div className="flex gap-1 items-center text-[15px]">
                <img src="/icons/star-icon.svg" alt="Rating" className="w-3 h-3" />
                <span>{selectedRoom.rating}</span> 
            </div>
          </section>
          <section>
            <Host host={hostDetails}></Host>
          </section>
        </div>
      </div>
      <footer className="flex justify-between items-center fixed bottom-0 min-h-20 w-full py-4 px-6">
        <div className="text-[#222222]">
          <p className="underline">
            <span className="font-semibold text-lg">{selectedRoom.price} </span>noite
          </p>
          <p className="text-xs">{selectedRoom.dayStart} - {selectedRoom.dayEnd} de {selectedRoom.month}.</p>
        </div>
        <button className="py-3.5 px-10 bg-[#E51D52] text-white font-semibold rounded-lg leading-4">Reservar</button>
      </footer>
    </main>
  );
}
