import Image from "next/image";
import React from "react";

const ImageView = ({
  imageInfo,
  className,
}: {
  imageInfo: { url: string; name: string };
  className: string;
}) => {
  const { url, name } = imageInfo;
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return <Image className={className} src={baseUrl + url} alt={name} />;
};

export default ImageView;
