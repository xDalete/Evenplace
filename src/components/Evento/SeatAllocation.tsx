/* TODO: Ver se com o tempo que nos resta vamos conseguir implementar essa bomba de componente 

import React from "react";
import { SeatLegend } from "./SeatLegend";
import { SeatGrid } from "./SeatGrid";
import Card from "@/components/common/Card";
import styles from "./SeatAllocation.module.scss";

export type SeatStatus = "paid" | "reserved" | "available";

interface SeatAllocationProps {
  seats: Array<{ status: SeatStatus }>;
}

const SeatAllocation: React.FC<SeatAllocationProps> = ({ seats }) => {
  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Alocação de Vagas</h3>
        <SeatLegend />
      </div>
      <SeatGrid seats={seats} />
    </Card>
  );
};

export default SeatAllocation;
*/
