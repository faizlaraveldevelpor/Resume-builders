import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import ResumeNavigater from "../public/Resume navigater 1.png";
import Image from "next/image";
import { PersonalInfo } from "@/types/usestateTypes";
import {Loader2} from 'lucide-react'

function PersonalInfoForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    email: "",
    phone: "",
    Profession:"",
    
  });
const [loading,setloading]=useState(false)
  // universal onChange handler
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const SaveInLocalHost = () => {
    setTimeout(() => {
    localStorage.setItem("persnalInformation", JSON.stringify(formData));
    router.push('/experience')
      setloading(true)
    }, 100);
  };
  useEffect(() => {
    const LocalstorageData = localStorage.getItem("persnalInformation");
if (LocalstorageData!=="undefined"&&LocalstorageData!==null) {
  setFormData(JSON.parse(LocalstorageData || ""));
}
    
  }, []);
  
  return (
    <div className="w-full flex md:flex-row flex-col gap-x-12">
      <div className="md:w-[70%] w-full">
        <div className="md:flex gap-x-5">
          <span className="md:w-[50%] w-full">
            <p className="mb-1 text-[14px]">First Name</p>
            <Input
              placeholder="Enter your first name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </span>
          <span className="md:w-[50%] w-full">
            <p className="mb-1 text-[14px] mt-4 md:mt-0">Last Name</p>
            <Input
              placeholder="Enter your last name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </span>
        </div>

        <span className="w-[100%]">
          <p className="mb-1 text-[14px] mt-5">Address </p>
          <Input
            placeholder="Enter your Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </span>

        <div className="md:flex gap-x-5 mt-5">
          <span className="md:w-[50%] w-full">
            <p className="mb-1 text-[14px]">City</p>
            <Input
              placeholder="Enter your City"
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </span>
          <span className="w-[20%]">
            <p className="mb-1 text-[14px] mt-5 md:mt-0">Country Name</p>
            <Input
              placeholder="Enter your Country Name"
              type="text"
              name="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </span>
          <span className="w-[30%]">
            <p className="mb-1 text-[14px] mt-5 md:mt-0">Zip</p>
            <Input
              placeholder="Enter your Zip"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </span>
        </div>

        <div className="md:flex gap-x-5 mt-5">
          <span className="md:w-[30%] w-full">
            <p className="mb-1 text-[14px]">Email Address</p>
            <Input
              placeholder="Enter your Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </span>
          <span className="w-[30%]">
            <p className="mb-1 text-[14px] mt-6 md:mt-0">Phone</p>
            <Input
              placeholder="Enter your Phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </span>
          <span className="w-[30%]">
            <p className="mb-1 text-[14px] mt-6 md:mt-0">Profession</p>
            <Input
              placeholder="Enter your Phone"
              type="text"
              name="Profession"
              value={formData.Profession}
              onChange={(e) => handleChange("Profession", e.target.value)}
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
        
            <Button
              className="bg-[#1C74F8] hover:bg-[#0d62e1] cursor-pointer w-[100px] h-[40px]"
              onClick={() => SaveInLocalHost()}
           disabled={loading} >
              {loading==true?<Loader2 className="animate-spin"/>:""}
              Next
            </Button>
          
        </div>
      </div>
      <div>
        <Image src={ResumeNavigater} alt="img" />
      </div>
    </div>
  );
}

export default PersonalInfoForm;
