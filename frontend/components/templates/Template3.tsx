"use client";
import { DynamicSectionsType, EducationInfo, ExperienceData, PersonalInfo } from "@/types/usestateTypes";
import { Grip, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type all = {
  dynamicName: number;
  dynamicHeadingSize: number;
  dynamictextSize: number;
  dynamicfontStyle: string;
};

function Resume3({ dynamicName, dynamicHeadingSize, dynamictextSize, dynamicfontStyle }: all) {
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
    const pers = localStorage.getItem("persnalInformation");
    if (pers) setPersnalInformation(JSON.parse(pers));

    const sum = localStorage.getItem("summary");
    if (sum) setSummary(JSON.parse(sum));

    const skl = localStorage.getItem("skills");
    if (skl) setSkills(JSON.parse(skl));

    const exp = localStorage.getItem("experiance");
    if (exp) setExperience(JSON.parse(exp));

    const edu = localStorage.getItem("education");
    if (edu) setEducation(JSON.parse(edu));

    const dyn = localStorage.getItem("dynamicsections");
    if (dyn) setdynamicSection(JSON.parse(dyn));
  }, []);

  return (
    <div>
      <div className="max-w-5xl mx-auto bg-white text-black shadow-lg border flex overflow-hidden">
        {/* ===== Left Sidebar ===== */}
        <div className="w-[30%] bg-gray-100 p-6 flex flex-col justify-between min-h-screen">
          <div>
            <div
              className={`text-center relative mb-6 ${hoverSections ? "border-2 border-blue-500" : ""}`}
              onMouseEnter={() => sethoverSections(true)}
              onMouseLeave={() => sethoverSections(false)}
            >
              <div
                className={`absolute left-0 z-40 flex justify-between w-full ${hoverSections ? "block" : "hidden"}`}
              >
                <span className="bg-blue-500 text-white h-fit">
                  <Grip className="p-1" />
                </span>
                <span className="bg-blue-500 text-white">
                  <Link href={`/persnalinfo`}>
                    <Pencil className="p-1 hover:scale-[1.2] cursor-pointer" />
                  </Link>
                  <Trash className="p-1 hover:scale-[1.2] cursor-pointer" />
                </span>
              </div>

              <h1
                className={`font-bold uppercase ${dynamicfontStyle}`}
                style={{ fontSize: `${dynamicName}px` }}
              >
                {PersnalInformation?.firstName} {PersnalInformation?.lastName}
              </h1>
              <p
                className={`text-gray-700 ${dynamicfontStyle}`}
                style={{ fontSize: `${dynamictextSize}px` }}
              >
                {PersnalInformation?.Profession}
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-8">
              <h2
                className={`font-semibold text-blue-600 mb-2 ${dynamicfontStyle}`}
                style={{ fontSize: `${dynamicHeadingSize}px` }}
              >
                Contact
              </h2>
              <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}>
                {PersnalInformation?.email}
              </p>
              <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}>
                {PersnalInformation?.phone}
              </p>
              <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}>
                {PersnalInformation?.city}, {PersnalInformation?.country}
              </p>
            </div>

            {/* Skills Section */}
            {Skills && !SkillsDelete && (
              <div className="mt-8">
                <h2
                  className={`font-semibold text-blue-600 mb-2 ${dynamicfontStyle}`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Skills
                </h2>
                <ul className="flex flex-col gap-1">
                  {Skills.map((skill, i) => (
                    <li
                      key={i}
                      className={`text-gray-700 ${dynamicfontStyle}`}
                      style={{ fontSize: `${dynamictextSize}px` }}
                    >
                      • {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ===== Right Main Content ===== */}
        <div className="w-[70%] p-8 bg-white overflow-y-scroll h-screen">
          <div className="flex flex-col gap-6">
            {/* Summary */}
            {!SummaryDelete && Summary && (
              <div className="relative group">
                <h2
                  className={`${dynamicfontStyle} font-semibold border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Summary
                </h2>
                <p
                  className={`${dynamicfontStyle}`}
                  style={{ fontSize: `${dynamictextSize}px` }}
                >
                  {Summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {!ExperienceDelete && Experience && (
              <div className="relative group">
                <h2
                  className={`${dynamicfontStyle} font-semibold border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Experience
                </h2>
                <ul className="list-disc list-inside">
                  {Experience.map((data, i) => (
                    <li key={i}>
                      <strong style={{ fontSize: `${dynamictextSize}px` }}>{data?.jobTitle}</strong> -{" "}
                      {data?.employer} ({data?.startDate} - {data?.endDate})
                      <p style={{ fontSize: `${dynamictextSize}px` }}>{data?.jobDescription}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {!EducationDelete && Education && (
              <div className="relative group">
                <h2
                  className={`${dynamicfontStyle} font-semibold border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Education
                </h2>
                <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}>
                  {Education?.degree}
                </p>
                <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}>
                  {Education?.schoolName} ({Education?.graduationDate})
                </p>
              </div>
            )}

            {/* Dynamic Sections (FIXED ✅) */}
            {dynamicSection?.length > 0 &&
              dynamicSection.map((data, index) =>{
                return(
                    <>
              <h3 className="font-semibold" style={{ fontSize: `${dynamicHeadingSize}px` }}>{data?.Name}</h3>
                    {
                        data?.dynamicSections?.blocks?.map((block, blockIndex) => {
                  if (block?.type === "paragraph") {
                    return (
                      <p
                        key={`p-${index}-${blockIndex}`}
                        className={`${dynamicfontStyle}`}
                        style={{ fontSize: `${dynamictextSize}px` }}
                      >
                        {block?.data?.text}
                      </p>
                    );
                  }
                  if (block?.type === "header") {
                    return (
                      <h2
                        key={`h-${index}-${blockIndex}`}
                        className={`${dynamicfontStyle} font-semibold pb-1 mb-2`}
                        style={{ fontSize: `${dynamictextSize + 1}px` }}
                      >
                        {block?.data?.text}
                      </h2>
                    );
                  }
                  if (block?.type === "list") {
                    const items = block?.data?.items || [];
                    return block?.data?.style === "ordered" ? (
                      <ol key={`ol-${index}-${blockIndex}`} className="ml-4 list-decimal">
                        {items.map((item: {content:string}, i: number) => (
                          <li
                            key={`li-o-${index}-${blockIndex}-${i}`}
                            className={`${dynamicfontStyle}`}
                            style={{ fontSize: `${dynamictextSize}px` }}
                          >
                            {typeof item === "string" ? item : item?.content || ""}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul key={`ul-${index}-${blockIndex}`} className="ml-4 list-disc">
                        {items.map((item: {content:string}, i: number) => (
                          <li
                            key={`li-u-${index}-${blockIndex}-${i}`}
                            className={`${dynamicfontStyle}`}
                            style={{ fontSize: `${dynamictextSize}px` }}
                          >
                            {typeof item === "string" ? item : item?.content || ""}
                          </li>
                        ))}
                      </ul>
                    );
                  }
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
    </div>
  );
}

export default Resume3;
