import NextImage, { ImageProps as NextImageProps } from "next/image";
import React from "react";

const Image: React.FC<NextImageProps> = ({ src, ...props }) => {
  return (
    <NextImage
      src={typeof src == "string" && !src.includes("http") ? process.env.IMAGES_PATH + src : src}
      {...props}
    />
  );
};

export default Image;
