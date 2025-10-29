"use client";

import { Button } from "@/components/ui/button";
import { useTextSectionMutation } from "@/lib/Gemini";
import { EducationInfo, ExperienceData, PersonalInfo } from "@/types/usestateTypes";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

export const dynamic = "force-dynamic";

export default function DocumentUpload() {
  const router = useRouter();
  const [apiFnc, { data, isLoading }] = useTextSectionMutation();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extractText, setExtractText] = useState<string>("");
  const [pdfToText, setPdfToText] = useState<any>(null);
  const [text, setText] = useState<{
    personalInformation: PersonalInfo;
    summary: string;
    skills: string[];
    experience: ExperienceData[];
    education: EducationInfo[];
  }>();

  // ✅ Dynamically import react-pdftotext only in browser
  useEffect(() => {
    const loadPdfToText = async () => {
      if (typeof window !== "undefined") {
        const mod = await import("react-pdftotext");
        setPdfToText(() => mod.default);
      }
    };
    loadPdfToText();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Sirf PDF aur Word documents allowed hain.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleChooseFile = () => fileInputRef.current?.click();

  // ✅ Extract PDF text only on client after library loaded
  useEffect(() => {
    if (!file || !pdfToText) return;

    const extract = async () => {
      try {
        const text = await pdfToText(file);
        setExtractText(text);
      } catch (err) {
        console.error("PDF parsing failed:", err);
      }
    };

    extract();
  }, [file, pdfToText]);

  useEffect(() => {
    if (!extractText) return;
    apiFnc(extractText);
  }, [extractText]);

  useEffect(() => {
    if (!data) return;
    try {
      const raw = data?.candidates[0]?.content?.parts[0]?.text
        ?.replace(/```json/g, "")
        ?.replace(/```/g, "")
        ?.trim();
      if (raw) setText(JSON.parse(raw));
    } catch (err) {
      console.error("JSON parse failed:", err);
    }
  }, [data]);

  useEffect(() => {
    if (!text) return;
    localStorage.setItem("persnalInformation", JSON.stringify(text.personalInformation));
    localStorage.setItem("experiance", JSON.stringify(text.experience));
    localStorage.setItem("education", JSON.stringify(text.education));
    localStorage.setItem("skills", JSON.stringify(text.skills));
    localStorage.setItem("summary", JSON.stringify(text.summary));
    router.push("persnalinfo");
  }, [text, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4">Upload Your Document</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleChooseFile}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mb-4"
        disabled={isLoading}
      >
        <p className={`flex gap-x-1 ${isLoading ? "block" : "hidden"}`}>
          <Loader2 className="animate-spin" /> Wait
        </p>
        <p className={`${isLoading ? "hidden" : "block"}`}>Choose File</p>
      </button>

      {file && (
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <p>
            <strong>Selected file:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <div className="flex justify-start mt-5">
        <Button
          className="cursor-pointer bg-white border text-black hover:bg-white hover:text-black"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
