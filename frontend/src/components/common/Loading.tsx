"use client";

import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Variants } from "@/lib/Types/Types";

import Icon from "./Icon";
import styles from "./Loading.module.scss";

type LoadingProps = {
  color?: string | Variants;
  size?: number | string;
};

const Loading: React.FC<LoadingProps> = props => {
  return <Icon className={styles.loadingIcon} icon={AiOutlineLoading3Quarters} {...props} />;
};

export default Loading;
