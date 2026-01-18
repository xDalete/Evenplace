import Image from "next/image";
import React from "react";
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
      <label className={styles.label}>Thumbnail do Evento</label>
      <div className={styles.imageWrapper}>
        <Image alt="Evento" className={styles.image} height={900} priority src={imageSrc} width={1600} />
        <button className={styles.editButton} onClick={onEdit} type="button">
          <Icon color="white" icon={LuPencil} size={20} />
        </button>
      </div>
    </div>
  );
};
