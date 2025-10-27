"use client";
import React, { useEffect, useState } from "react";
import ResumeNavigater3 from "../public/Resume navigater 3.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SelectDegree } from "./SelectDegree";
import { EducationInfo } from "@/types/usestateTypes";
import { Loader2 } from "lucide-react";



function EducationForm() {
  const router = useRouter();
  const [loading,setloading]=useState(false)

  const [formData, setFormData] = useState<EducationInfo>({
    schoolName: "",
    city: "",
    state: "",
    degree: "",
    fieldOfStudy: "",
    graduationDate: "",
  });

  // Universal onChange handler
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const SaveInLocalHost = () => {
    setTimeout(() => {
      if (formData) {
      localStorage.setItem("education", JSON.stringify(formData));
        
      }
    
      setloading(true)
      router.push('/skills')
    }, 100);
    };
    useEffect(() => {
      const LocalstorageData = localStorage.getItem("education");
     if (LocalstorageData!=="undefined") {
      setFormData(JSON.parse(LocalstorageData || ""));
        
     }
      
    }, []);
  return (
    <div className="w-full flex md:flex-row flex-col gap-x-12 mt-10">
      <div className="md:w-[70%] w-full">
        <div className="md:flex gap-x-5">
          <span className="md:w-[50%] w-full">
            <p className="mb-1 text-[14px]">School name</p>
            <Input
              placeholder="School name"
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={(e) => handleChange("schoolName", e.target.value)}
            />
          </span>
          <span className="md:w-[50%] w-full ">
            <p className="mb-1 text-[14px] mt-4 md:mt-0">City</p>
            <Input
              placeholder="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </span>
        </div>

        <span className="w-[100%] ">
          <p className="mb-1 text-[14px] mt-5">State</p>
          <Input
            placeholder="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </span>

        <div className="md:flex gap-x-5 mt-5 mb-4">
          <span className="md:w-[50%] w-full">
            <p className="mb-1 text-[14px]">Select Degree</p>
            <SelectDegree
            setFormData={setFormData} formData={formData?.degree}              
            />
          </span>

          <span className="md:w-[50%] w-full">
            <p className="mb-1 text-[14px]">Field of study</p>
            <Input
              placeholder="Field of study"
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
            />
          </span>

          <span className="w-[20%]">
            <p className="mb-1 text-[14px] mt-5 md:mt-0">Graduation date</p>
            <Input
              type="month"
              name="graduationDate"
              value={formData.graduationDate}
              onChange={(e) => handleChange("graduationDate", e.target.value)}
            />
          </span>
        </div>

        <div className="flex justify-between gap-x-16 w-full px-10 mt-10">
          <Button
            className="bg-white hover:bg-gray-50 text-black border cursor-pointer w-[100px] h-[40px]"
            onClick={() => router.back()}
          >
            Back
          </Button>
        
            <Button className="bg-[#1C74F8] hover:bg-[#0d62e1] cursor-pointer w-[100px] h-[40px]" disabled={loading} onClick={()=>SaveInLocalHost()}>
              {loading==true?<Loader2 className="animate-spin"/>:""}
              Next
            </Button>
          
        </div>
      </div>

      <div>
        <Image src={ResumeNavigater3} alt="img" />
      </div>
    </div>
  );
}

export default EducationForm;
