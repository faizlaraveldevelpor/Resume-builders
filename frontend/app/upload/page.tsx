"use client";

import { Button } from "@/components/ui/button";
import { useTextSectionMutation } from "@/lib/Gemini";
import { EducationInfo, ExperienceData, PersonalInfo } from "@/types/usestateTypes";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import pdfToText from 'react-pdftotext'
export default function DocumentUpload() {
  const router=useRouter()
 const [apiFnc,{data,isLoading}]=useTextSectionMutation()
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extracttext,setextracttext]=useState<string>("")
  const [text,setext]=useState<{
    personalInformation:PersonalInfo,
    summary:string,
    skills:[],
    experience:ExperienceData[],
    education:EducationInfo[]
  }>()

  // File select handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Optional: Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Sirf PDF aur Word documents allowed hain.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  // Custom button click
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };


useEffect(()=>{

    pdfToText(file!).then((data)=>setextracttext(data))
    
  
},[file])
useEffect(()=>{
    if (extracttext!=="") {
        apiFnc(extracttext!)
    }
},[extracttext])

useEffect(()=>{
    if (data) {
    const cleanString = data?.candidates[0]?.content?.parts[0]?.text.replace(/```json/g, "").replace(/```/g, "").trim();

   setext(JSON.parse(cleanString))
}

},[data])
if (text) {
    localStorage.setItem("persnalInformation", JSON.stringify(text.personalInformation));
    localStorage.setItem("experiance", JSON.stringify(text.experience));
    localStorage.setItem("education", JSON.stringify(text.education));
    localStorage.setItem("skills", JSON.stringify(text.skills));
    localStorage.setItem("summary", JSON.stringify(text.summary));
    router.push('persnalinfo')
}

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4">Upload Your Document</h2>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Custom button */}
      <button
        type="button"
        onClick={handleChooseFile}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mb-4"
        disabled={isLoading}
      >
        <p className={` flex gap-x-1 ${isLoading?"block  ":"hidden"}`}><Loader2 className="animate-spin"/> Wait</p>
        <p className={`${isLoading?"hidden":"block"}`}>Choose File</p>
      </button>

      {/* Show selected file */}
      {file && (
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <p><strong>Selected file:</strong> {file.name}</p>
          <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      {/* Hidden input to save file for form submission */}
      {file && (
        <input type="hidden" name="document" value={file.name} />
      )}
      <div>

<div className="flex justify-start mt-5">
      <Button className="cursor-pointer bg-white border text-black hover:bg-white hover:text-black" onClick={()=>router.back()}>Back</Button>

</div>
      </div>
    </div>
  );
}
