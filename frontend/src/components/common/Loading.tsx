"use client";

import React from "react";
import Icon from "./Icon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./Loading.module.scss";
import { Variants } from "@/lib/Types/Types";

type LoadingProps = {
  size?: number | string;
  color?: Variants | string;
};

const Loading: React.FC<LoadingProps> = props => {
  return <Icon icon={AiOutlineLoading3Quarters} className={styles.loadingIcon} {...props} />;
};

export default Loading;
