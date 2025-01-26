"use client";

import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

const BackButton: React.FC = ({ fallback = "/" }: { fallback?: string }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button onClick={handleGoBack} className={styles.button}>
      <img src="/icons/arrow-prev.svg" alt="" className={styles.icon} />
    </button>
  );
};

export default BackButton;
