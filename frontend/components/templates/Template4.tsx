"use client";
import { DynamicSectionsType, EducationInfo, ExperienceData, PersonalInfo } from "@/types/usestateTypes";
import { Grip, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type all = { dynamicName: number; dynamicHeadingSize: number; dynamictextSize: number; dynamicfontStyle: string; };

function Resume4({ dynamicName, dynamicHeadingSize, dynamictextSize, dynamicfontStyle }: all) {
  const [PersnalInformation, setPersnalInformation] = useState<PersonalInfo>();
  const [Summary, setSummary] = useState<string>();
  const [Skills, setSkills] = useState<string[]>();
  const [Experience, setExperience] = useState<ExperienceData[]>();
  const [Education, setEducation] = useState<EducationInfo>();
  const [dynamicSection, setdynamicSection] = useState<DynamicSectionsType[]>([]);
  const [hoverSections, sethoverSections] = useState(false);

  const [SummaryDelete, setSummaryDelete] = useState(false);
  const [SkillsDelete, setSkillsDelete] = useState(false);
  const [ExperienceDelete, setExperienceDelete] = useState(false);
  const [EducationDelete, setEducationDelete] = useState(false);

  useEffect(() => {
    const pers = localStorage.getItem("persnalInformation"); if (pers) setPersnalInformation(JSON.parse(pers));
    const sum = localStorage.getItem("summary"); if (sum) setSummary(JSON.parse(sum));
    const skl = localStorage.getItem("skills"); if (skl) setSkills(JSON.parse(skl));
    const exp = localStorage.getItem("experiance"); if (exp) setExperience(JSON.parse(exp));
    const edu = localStorage.getItem("education"); if (edu) setEducation(JSON.parse(edu));
    const dyn = localStorage.getItem("dynamicsections"); if (dyn) setdynamicSection(JSON.parse(dyn));
  }, []);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${dynamicfontStyle}`} style={{ fontSize: `${dynamicName}px` }}>{PersnalInformation?.firstName} {PersnalInformation?.lastName}</h1>
          <p className="text-gray-700" style={{ fontSize: `${dynamictextSize}px` }}>{PersnalInformation?.Profession} • {PersnalInformation?.city}, {PersnalInformation?.country}</p>
          <p className="text-gray-600 mt-1" style={{ fontSize: `${dynamictextSize}px` }}>{PersnalInformation?.email} • {PersnalInformation?.phone}</p>
        </div>

        <div className="space-y-6">
          {!SummaryDelete && Summary && <div><h2 className="font-semibold" style={{ fontSize: `${dynamicHeadingSize}px` }}>Summary</h2><p style={{ fontSize: `${dynamictextSize}px` }}>{Summary}</p></div>}

          {!ExperienceDelete && Experience && <div><h2 className="font-semibold" style={{ fontSize: `${dynamicHeadingSize}px` }}>Experience</h2><div className="mt-2 space-y-3">{Experience.map((e,i)=>(<div key={i}><div className="flex justify-between"><strong style={{ fontSize: `${dynamictextSize}px` }}>{e.jobTitle}</strong><span className="text-sm text-gray-500">{e.startDate} - {e.endDate}</span></div><div className="text-gray-700">{e.employer}</div><p style={{ fontSize: `${dynamictextSize}px` }}>{e.jobDescription}</p></div>))}</div></div>}

          {!EducationDelete && Education && <div><h2 className="font-semibold" style={{ fontSize: `${dynamicHeadingSize}px` }}>Education</h2><p style={{ fontSize: `${dynamictextSize}px` }}>{Education?.degree} — {Education?.schoolName} ({Education?.graduationDate})</p></div>}

          {dynamicSection?.length > 0 && dynamicSection.map((data, idx) =>{
            return(
                <>
              <h3 className="font-semibold" style={{ fontSize: `${dynamicHeadingSize}px` }}>{data?.Name}</h3>
                {
                    data?.dynamicSections?.blocks?.map((block, bIdx) => {
            if (block.type === "header") return <h3 key={`h-${idx}-${bIdx}`} className="font-semibold mt-4" style={{ fontSize: `${dynamictextSize + 1}px` }}>{block.data.text}</h3>;
            if (block.type === "paragraph") return <p key={`p-${idx}-${bIdx}`} style={{ fontSize: `${dynamictextSize}px` }}>{block.data.text}</p>;
            if (block.type === "list") return <ul key={`l-${idx}-${bIdx}`} className="ml-5 list-disc">{(block.data.items||[]).map((it:{content:string},i:number)=><li key={i} style={{ fontSize: `${dynamictextSize}px` }}>{typeof it==="string"?it:(it?.content||"")}</li>)}</ul>;
            return null;
          })
                }
                </>
            )
          } 
          
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume4;
