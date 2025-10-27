"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import ResumeNavigater4 from "../public/Resume navigater 4.png";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

function PersnalInfoForm() {
  const router = useRouter();
    const [loading,setloading]=useState(false)
  
  const [skillsFields, setskillsFields] = useState<string>("");
  const [AddedskillsFields, setAddedskillsFields] = useState<string[]>([]);

  // ➕ Add new skill
  const handleAddSkill = () => {
    if (!skillsFields.trim()) return;
    if (!AddedskillsFields.includes(skillsFields.trim())) {
      setAddedskillsFields((prev) => [...prev, skillsFields.trim()]);
    }
    setskillsFields("");
  };

  // ❌ Delete skill by index
  const handleDeleteSkill = (index: number) => {
    setAddedskillsFields((prev) => prev.filter((_, i) => i !== index));
  };

  // ⌨️ Add skill on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };
const SaveInLocalHost = () => {
  setTimeout(() => {
      localStorage.setItem("skills", JSON.stringify(AddedskillsFields));
      
    
      setloading(true)
      router.push('/summary')
    }, 100);
    };
    useEffect(() => {
      const LocalstorageData = localStorage.getItem("skills");
     if (LocalstorageData!=="undefined") {
      setAddedskillsFields(JSON.parse(LocalstorageData || ""));
        
     }
      
    }, []);
  return (
    <div className="w-full flex md:flex-row flex-col gap-x-12 items-start mt-10">
      {/* Left Section */}
      <div className="md:w-[70%] w-full bg-white border rounded-2xl shadow-sm p-6">
        {/* Heading */}
        <h3 className="text-[20px] font-semibold text-gray-800 mb-3">
          Add Your <span className="text-blue-700">Skills</span>
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Highlight your strongest skills — they help employers understand your expertise.
        </p>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <Input
            placeholder="Enter a skill (e.g. React, Node.js)"
            value={skillsFields}
            onChange={(e) => setskillsFields(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAddSkill}
          >
            + Add Skill
          </Button>
        </div>

        {/* Skills Display */}
        <div className="flex flex-wrap gap-3 mt-6 border border-gray-200 rounded-xl p-4 min-h-[100px] bg-gray-50">
          {AddedskillsFields.length === 0 ? (
            <p className="text-gray-400 text-sm italic">
              No skills added yet — start by adding one above.
            </p>
          ) : (
            AddedskillsFields.map((data, i) => (
              <div
                key={i}
                className="flex items-center gap-x-2 px-3 py-1 bg-white border border-blue-200 text-blue-700 font-medium rounded-full text-sm shadow-sm hover:bg-blue-50 transition"
              >
                <span>{data}</span>
                <X
                  size={16}
                  className="cursor-pointer text-gray-400 hover:text-red-500 transition"
                  onClick={() => handleDeleteSkill(i)}
                />
              </div>
            ))
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 text-gray-800"
            onClick={() => router.back()}
          >
            Back
          </Button>

          
            <Button className="bg-[#1C74F8] hover:bg-[#0d62e1] w-[100px]" disabled={loading==true} onClick={()=>SaveInLocalHost()}>
              {loading==true?<Loader2 className="animate-spin"/>:""}
              Next
            </Button>
          
        </div>
      </div>

      {/* Right Side Image */}
      <div className="mt-10 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
        <Image
          src={ResumeNavigater4}
          alt="Resume illustration"
          className="max-w-[350px] w-full object-contain"
        />
      </div>
    </div>
  );
}

export default PersnalInfoForm;
