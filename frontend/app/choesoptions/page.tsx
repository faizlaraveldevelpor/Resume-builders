"use client";
import { Button } from "@/components/ui/button";
import { FilePen, FileUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Choesoptions() {
  const router = useRouter();
  return (
    <div className="min-w-full min-h-screen pt-12 bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#eef4ff]">
      {/* Heading */}
      <h3 className="text-center font-bold text-2xl md:text-3xl text-[#0B1739] tracking-tight">
        How would you like to build your Resume?
      </h3>

      {/* Options */}
      <div className="flex md:flex-row flex-col md:justify-center md:items-start gap-y-8 md:gap-y-0 items-center mt-10 w-full gap-x-16">
        {/* Create New Resume */}
        <Link href={"/persnalinfo"}>
          <div className="w-[300px] h-[200px] border border-gray-200 bg-white flex flex-col items-center justify-center rounded-xl hover:border-[#1C74F8] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <FilePen className="size-[80px] text-[#1C74F8] mb-3 transition-all duration-300 group-hover:scale-110" />
            <h3 className="font-semibold text-lg text-[#0B1739]">
              Create a New Resume
            </h3>
            <p className="text-[12px] mt-1 text-gray-500 text-center px-4">
              We will guide you through each section of your new resume!
            </p>
          </div>
        </Link>

        {/* Upload Resume */}
        <Link href={`/upload`}>
        <div className="w-[300px] h-[200px] border border-gray-200 bg-white flex flex-col items-center justify-center rounded-xl hover:border-[#1C74F8] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <FileUp className="size-[80px] text-[#1C74F8] mb-3 transition-all duration-300 group-hover:scale-110" />
          <h3 className="font-semibold text-lg text-[#0B1739]">
            Upload My Resume
          </h3>
          <p className="text-[12px] mt-1 text-gray-500 text-center px-4">
            Instantly upload and enhance your existing resume with our builder!
          </p>
        </div>
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-x-8 w-full px-10 mt-12">
        <Button
          className="bg-white hover:bg-gray-50 text-black border border-gray-300 cursor-pointer w-[110px] h-[44px] shadow-sm transition-all duration-300"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Link href={"/persnalinfo"}>
          <Button className="bg-[#1C74F8] hover:bg-[#0d62e1] cursor-pointer w-[110px] h-[44px] text-white font-medium shadow-md transition-all duration-300 hover:scale-105">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Choesoptions;
