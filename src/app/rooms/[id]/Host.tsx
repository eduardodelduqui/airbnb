import { IHost } from "@/app/types/interfaces";
import styles from "./Host.module.css";

const HostComponent: React.FC<{ host: IHost }> = ({ host }) => {
  const text = host.superhost
    ? `Superhost • ${host.years} anos hospedando`
    : `${host.years} anos hospedando`;

  return (
    <div className={styles.hostContainer}>
      <div className={styles.hostAvatar}>
        <img className={styles.hostImage} src={host.image} alt={host.name} />
      </div>
      <div>
        <p className={styles.hostName}>Anfitriã(o): {host.name}</p>
        <p className={styles.hostDetails}>{text}</p>
      </div>
    </div>
  );
};

export default HostComponent;
