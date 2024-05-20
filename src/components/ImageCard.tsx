"use client";
import React from "react";

import Image from "next/image"
import { Cat } from "@/type";
import { TbCloudDownload } from "react-icons/tb";
import { useState } from "react";
import { saveAs } from "file-saver";
import Loading from "./Loading";
type Props = {
  cat: Cat;
};

export default function ImageCard({ cat }: Props) {
  const isAnimatedImage = cat.url.indexOf(".gif") > -1;
  
  return (
    <div className="relative mb-4   transition-all overflow-hidden break-inside-avoid group hover:brightness-95 ">
      <DownloadBtn cat={cat} />
      <Image
        className="w-auto h-auto max-w-full max-h-full object-contain "
        height={cat.height}
        width={cat.width}
        src={cat.url}
        alt={`Cat image, id: ${cat.id}`}
        layout="responsive"
        unoptimized={isAnimatedImage}
      />
    </div>
  );
}

function DownloadBtn({ cat }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function downloadImage(imageUrl: string, imageName: string) {
    try {
      setIsDownloading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, `${imageName}.png`);
    } catch {
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button
      onClick={() => downloadImage(cat.url, cat.id)}
      className="bg-black/80  top-5 rounded-full hover:bg-black/50 right-5 absolute p-2 border"
    >
      {isDownloading ? (
        <Loading className="h-6 w-6" />
      ) : (
        <TbCloudDownload className="text-xl text-white " />
      )}
    </button>
  );
}
