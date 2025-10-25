"use client";
import React, { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import ResumeNavigation5 from "../../public/resume navigator 5.png";
import { useRouter } from "next/navigation";
import { useSummaryCreateMutation } from "@/lib/Gemini";

function SummarySection() {
  const [APiData,{data,isLoading}]=useSummaryCreateMutation()
  const router = useRouter();
  const [summaryType, setSummaryType] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleGenerateAI = async () => {
    setSummaryType("")
    if (!summaryType) {
      alert("Please specify what kind of summary you want first!");
      return;
    }

    APiData(summaryType)
    
  };
  useEffect(()=>{
   if (isLoading) {
    setLoading(true)
   }else{
    setLoading(false)
    setSummary(data?.candidates[0]?.content?.parts[0]?.text as string)
    console.log(data);
    
   }
  },[isLoading])
  const SaveInLocalHost = () => {
    setTimeout(() => {
        localStorage.setItem("summary", JSON.stringify(summary));
      setLoading2(true)
      router.push('/showresume')
      
    }, 100);
      };
      useEffect(() => {
        const LocalstorageData = localStorage.getItem("summary");
       if (LocalstorageData) {
        setSummary(JSON.parse(LocalstorageData || ""));
          
       }
        
      }, []);

  return (
    <div className="md:flex w-full gap-x-4">
      <div className="w-full md:w-[70%] bg-white rounded-2xl shadow-sm border p-6 mt-10">
        <h3 className="text-[20px] font-semibold text-gray-800 mb-2">
          🧠 Professional Summary
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Tell us what type of summary you want (e.g. Professional, Creative, Short, Detailed)
          and then generate it using AI or write manually.
        </p>

        {/* 🔹 New Input Field */}
        <input
          type="text"
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          placeholder="Type your summary here or click 'Generate with AI'..."
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter summary type (e.g. Professional, Creative...)."
          rows={6}
          className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 mb-5"
        />

        <div className="flex gap-4">
          <Button
            onClick={handleGenerateAI}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate with AI
              </>
            )}
          </Button>

          
        </div>

        <div className="flex justify-between gap-x-16 w-full px-10 mt-10">
          <Button
            className="bg-white hover:bg-gray-50 text-black border cursor-pointer w-[100px] h-[40px]"
            onClick={() => router.back()}
          >
            Back
          </Button>
          
            <Button className="bg-[#1C74F8] hover:bg-[#0d62e1] cursor-pointer w-[120px] h-[40px]" disabled={loading2==true} onClick={()=>SaveInLocalHost()}>
              {loading2?<Loader2 className="animate-spin w-4 h-4" />:""}
              Create Resume
            </Button>
          
        </div>
      </div>

      <div className="mt-10 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
        <Image
          src={ResumeNavigation5}
          alt="Resume illustration"
          className="max-w-[350px] w-full object-contain"
        />
      </div>
    </div>
  );
}

export default SummarySection;
