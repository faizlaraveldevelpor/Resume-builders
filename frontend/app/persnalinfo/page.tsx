"use client";
import React from "react";
import profileImage from "../../public/profile image.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PersnalInfoForm from "@/components/PersnalInfoForm";

function Persnalinfo() {
  return (
    <div className="flex flex-col items-center">
      {/* Header Section */}
      <section className="p-8 md:px-16 2xl:w-[1200px] w-full bg-gradient-to-r from-[#f9fbff] via-[#ffffff] to-[#f1f5ff] rounded-2xl shadow-sm mt-5 border border-gray-100">
        <div className="flex gap-x-2 md:flex-row flex-col items-center mb-2">
          <h3 className="text-[22px] text-[#0B1739]">Complete Your</h3>
          <h3 className="font-bold text-[22px] text-[#1C74F8]">
            Resume Heading
          </h3>
        </div>
        <p className="text-[13px] text-gray-500">
          Employers will use this information to contact you.
        </p>

        {/* Image + Upload */}
        <div className="mt-6 flex items-center gap-x-6 bg-[#F7F9FC] rounded-xl px-6 py-4 shadow-sm border border-gray-100">
          <div className="relative">
            <Image
              src={profileImage}
              width={100}
              height={100}
              alt="Profile"
              className="rounded-full border border-[#dce6ff] shadow-sm object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white"></div>
          </div>

          <Button className="bg-[#1C74F8] hover:bg-[#0e64e6] cursor-pointer text-white font-medium px-5">
            Upload Photo
          </Button>
        </div>
      </section>

      {/* Form Section */}
      <section className="p-8 px-6 md:px-16 2xl:w-[1200px] w-full bg-white rounded-2xl shadow-md mt-8 border border-gray-100">
        <PersnalInfoForm />
      </section>
    </div>
  );
}

export default Persnalinfo;
