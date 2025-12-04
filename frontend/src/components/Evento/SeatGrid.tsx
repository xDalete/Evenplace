/* TODO: Ver se com o tempo que nos resta vamos conseguir implementar essa bomba de componente 
import React from "react";
import { SeatStatus } from "./SeatAllocation";
import styles from "./SeatGrid.module.scss";

interface SeatGridProps {
  seats: Array<{ status: SeatStatus }>;
}

export const SeatGrid: React.FC<SeatGridProps> = ({ seats }) => {
  const getStatusClass = (status: SeatStatus) => {
    switch (status) {
      case "paid":
        return styles.paid;
      case "reserved":
        return styles.reserved;
      case "available":
        return styles.available;
    }
  };

  return (
    <div className={styles.grid}>
      {seats.map((seat, index) => (
        <div
          key={index}
          className={`${styles.seat} ${getStatusClass(seat.status)}`}
          role="button"
          tabIndex={0}
        />
      ))}
    </div>
  );
};
*/
