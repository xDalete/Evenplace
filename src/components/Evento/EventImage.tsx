import React from "react";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";
import Icon from "@/components/common/Icon";
import styles from "./EventImage.module.scss";

interface EventImageProps {
  imageSrc?: string;
  onEdit?: () => void;
}

export const EventImage: React.FC<EventImageProps> = ({ imageSrc = "/image1.jpg", onEdit }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Evento</label>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt="Evento"
          width={313}
          height={182}
          className={styles.image}
          priority
        />
        <button className={styles.editButton} onClick={onEdit} type="button">
          <Icon icon={LuPencil} size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

