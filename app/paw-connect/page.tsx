"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type ImageItem = { file: File | null; url: string };
const Page = () => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const { user: clerkUser } = useUser();
  const clerkId = clerkUser?.id;

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Page;
