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
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL + (url.startsWith("/") ? url : `/${url}`);

  return (
    <Image
      width={"400"}
      height={"400"}
      className={className}
      src={imageUrl}
      alt={name}
    />
  );
};

export default ImageView;
