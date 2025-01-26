import { IHost, IListing } from "@/app/types/interfaces";
import AmenitiesDetails from "@/components/Amenities/Amenities";
import BackButton from "@/components/BackButton/BackButton";
import Carousel from "@/components/Carousel/Carousel";
import Header from "@/components/Header/Header";
import ImageGrid from "@/components/ImageGrid/ImageGrid";
import RoomDetails from "@/components/RoomDetails/RoomDetails";
import { notFound } from "next/navigation";
import BookingBox from "./BookingBox";
import FavoriteFlag from "./FavoriteFlag";
import Features from "./Features";
import Host from "./Host";
import styles from "./page.module.css";
import SubTitle from "./Subtitle";

const getRoomDetails = async (id: string): Promise<IListing> => {
  const response = await fetch(`http://localhost:3000/api/listings/${id}`);
  const room = await response.json();
  return room[0];
};

const getHostDetails = async (hostId: string): Promise<IHost> => {
  const response = await fetch(`http://localhost:3000/api/hosts/${hostId}`);
  const host = await response.json();
  return host[0];
};

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);
  const selectedRoom = await getRoomDetails(id);
  const hostDetails = await getHostDetails(selectedRoom.host);

  if (!selectedRoom) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <main>
        <div className={styles.main}>
          <div className={styles.relative}>
            <div className={styles.backButton}>
              <BackButton />
            </div>
            <div className={styles.hiddenTablet}>
              <Carousel showIndicators={false} showArrows={false}>
                {selectedRoom.images.map((image, index) => (
                  <img
                    className={styles.carouselImage}
                    key={index}
                    src={image}
                    alt="Imagem do quarto"
                  />
                ))}
              </Carousel>
            </div>
            <div className={styles.hiddenMobile}>
              <h1 className={styles.roomTitle}>{selectedRoom.title}</h1>
              <ImageGrid images={selectedRoom.images} />
            </div>
          </div>

          <div className={styles.contentContainer}>
            <div>
              <h1 className={`${styles.roomTitle} ${styles.hiddenTablet}`}>
                {selectedRoom.title}
              </h1>
              <section className={styles.section}>
                <SubTitle room={selectedRoom} />
                <Features room={selectedRoom} />
              </section>
              <section>
                <FavoriteFlag listing={selectedRoom} />
                <Host host={hostDetails}></Host>
              </section>
              <RoomDetails room={selectedRoom} />
              <AmenitiesDetails amenities={selectedRoom.amenities} />
            </div>
            <section className={styles.bookingBoxContainer}>
              <BookingBox
                price={selectedRoom.price}
                minimumRangeDays={selectedRoom.minimumRangeDays}
                maxNumberGuests={selectedRoom.maxNumberGuests}
                minNumberGuests={selectedRoom.minNumberGuests}
              />
            </section>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerDetails}>
            <p className={styles.footerPrice}>
              <span className={styles.footerPriceHighlight}>
                {selectedRoom.price}{" "}
              </span>
              noite
            </p>
            <p className={styles.footerDate}>
              {selectedRoom.dayStart} - {selectedRoom.dayEnd} de{" "}
              {selectedRoom.month}.
            </p>
          </div>
          <button className={styles.bookingButton}>Reservar</button>
        </footer>
      </main>
    </div>
  );
}
