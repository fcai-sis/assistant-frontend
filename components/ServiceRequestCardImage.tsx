"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServiceRequestCardImage({ src }: { src: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt="Service request invoice image"
        width={80}
        height={80}
        onClick={(_) => setIsModalOpen(true)}
        className="cursor-pointer rounded-lg brightness-75 hover:brightness-105 transition-all duration-300"
      />
      <div
        className="z-50 w-full h-full fixed top-0 left-0 bg-black bg-opacity-65"
        style={{ display: isModalOpen ? "block" : "none" }}
        onClick={(_) => setIsModalOpen(false)}
      >
        <Image
          src={src}
          alt="Service request invoice image"
          width={500}
          height={500}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </>
  );
}
