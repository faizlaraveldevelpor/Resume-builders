"use client";
import { useGetDocomentApiQuery } from "@/lib/docoment";
import {
  DynamicSectionsType,
  EducationInfo,
  ExperienceData,
  PersonalInfo,
} from "@/types/usestateTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dot, Grip, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type allFieldsType = {
  id: string;
  dynamicHeadingSize: number;
  Summary: string | undefined;
  Skills: string[] | undefined;
  dynamictextSize: number;
  Experience: ExperienceData[] | undefined;
  Education: EducationInfo | undefined;
  dynamicfontStyle: string;
  dynamicSection: DynamicSectionsType[] | undefined;
  dynamicName: number;
  PersnalInformation: PersonalInfo | undefined;
  SummaryDelete:boolean
  setSummaryDelete:React.Dispatch<React.SetStateAction<boolean>>
  SkillsDelete:boolean
  setSkillsDelete:React.Dispatch<React.SetStateAction<boolean>>
  ExperienceDelete:boolean
  setExperienceDelete:React.Dispatch<React.SetStateAction<boolean>>
  EducationDelete:boolean
  setEducationDelete:React.Dispatch<React.SetStateAction<boolean>>
};

export function SortableBox2({
  id,
  dynamicHeadingSize,
  Summary,
  Skills,
  dynamictextSize,
  Experience,
  Education,
  dynamicfontStyle,
  dynamicSection,
  dynamicName,
  PersnalInformation,
  SummaryDelete,
  setSummaryDelete,
  SkillsDelete,
  setSkillsDelete,
  ExperienceDelete,
  setExperienceDelete,
  EducationDelete,
  setEducationDelete,
}: allFieldsType) {
  const { data } = useGetDocomentApiQuery("");
  const [hoverSections, sethoverSections] = useState(false);
  

  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const activeDynamicSection = useMemo(
    () => dynamicSection?.find((data) => data?.id?.toString() === id),
    [dynamicSection, id]
  );

  const DeleteDynamicSection = useCallback(
    (sectionId: string) => {
      const FilterDeletedDynamicSection = (dynamicSection ?? []).filter(
        (data) => data?.id?.toString() !== sectionId
      );
      localStorage.setItem("dynamicsections", JSON.stringify(FilterDeletedDynamicSection));
    },
    [dynamicSection]
  );
  
  

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab active:cursor-grabbing bg-white shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300"
    >
      <div className="text-gray-900">
        {/* HEADER */}
        {id === "header" && (
          <div
            className={`relative mb-6 ${hoverSections ? "border border-blue-400 rounded-xl" : ""}`}
            onMouseEnter={() => sethoverSections(true)}
            onMouseLeave={() => sethoverSections(false)}
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <div
              className={`absolute left-0 top-0 w-full flex justify-between p-1 ${
                hoverSections ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <span className="bg-blue-500 text-white rounded-md shadow-md">
                <Grip className="p-1" />
              </span>
              <span className="bg-blue-500 text-white rounded-md shadow-md flex">
                <Link href={`/persnalinfo`}>
                  <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" />
                </Link>
                <Trash className="p-1 hover:scale-110 cursor-pointer transition-transform" />
              </span>
            </div>

            <div className="text-left space-y-1 border-l-4 border-blue-500 pl-4">
              <h1
                className={`font-bold tracking-wide ${dynamicfontStyle}`}
                style={{ fontSize: `${dynamicName + 2}px` }}
              >
                {PersnalInformation?.firstName} {PersnalInformation?.lastName}
              </h1>
              <p
                className={`text-blue-600 font-medium ${dynamicfontStyle}`}
                style={{ fontSize: `${dynamictextSize}px` }}
              >
                {PersnalInformation?.Profession}
              </p>
              <p
                className={`text-gray-600 ${dynamicfontStyle}`}
                style={{ fontSize: `${dynamictextSize - 1}px` }}
              >
                {PersnalInformation?.email} • {PersnalInformation?.phone} •{" "}
                {PersnalInformation?.city}, {PersnalInformation?.country}
              </p>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        <div className={` ${SummaryDelete==true?"hidden":"block "}`}>
{id === "persnalInformation"  &&  (
          <div
            className={`relative mb-6 ${SummaryDelete==true?"hidden":"block"} ${hoverSections ? "border border-blue-400 rounded-xl p-3" : ""}`}
            onMouseEnter={() => sethoverSections(true)}
            onMouseLeave={() => sethoverSections(false)}
          >
            <div
              className={`absolute left-0 top-0 w-full flex justify-between ${
                hoverSections ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <span
                className="bg-blue-500 text-white rounded-md"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <Grip className="p-1" />
              </span>
              <span className="bg-blue-500 text-white rounded-md">
                <Link href={`/summary`}>
                  <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" />
                </Link>
                <Trash
                  className="p-1 hover:scale-110 cursor-pointer transition-transform"
                  onClick={() => {setSummaryDelete(true)}  } 
                />
              </span>
            </div>
            {!SummaryDelete && (
              <>
                <h2
                  className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Summary
                </h2>
                <p
                  className={`${dynamicfontStyle} text-gray-700 leading-relaxed`}
                  style={{ fontSize: `${dynamictextSize}px` }}
                >
                  {Summary}
                </p>
              </>
            )}
          </div>
        )}
        </div>
        

        {/* SKILLS */}
        {id === "skills" && (
          <div
            className={`relative mb-6 ${hoverSections ? "border border-blue-400 rounded-xl p-3" : ""}`}
            onMouseEnter={() => sethoverSections(true)}
            onMouseLeave={() => sethoverSections(false)}
          >
            <div
              className={`absolute left-0 top-0 w-full flex justify-between ${
                hoverSections ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <span
                className="bg-blue-500 text-white rounded-md"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <Grip className="p-1" />
              </span>
              <span className="bg-blue-500 text-white rounded-md">
                <Link href={`/skills`}>
                  <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" />
                </Link>
                <Trash
                  className="p-1 hover:scale-110 cursor-pointer transition-transform"
                  onClick={() => setSkillsDelete(true)}
                />
              </span>
            </div>

            {!SkillsDelete && (
              <>
                <h2
                  className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Skills?.map((data, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {data}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* EXPERIENCE */}
        {id === "experience" && (
          <div
            className={`relative mb-6 ${hoverSections ? "border border-blue-400 rounded-xl p-3" : ""}`}
            onMouseEnter={() => sethoverSections(true)}
            onMouseLeave={() => sethoverSections(false)}
          >
            <div
              className={`absolute left-0 top-0 w-full flex justify-between ${
                hoverSections ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <span
                className="bg-blue-500 text-white rounded-md"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <Grip className="p-1" />
              </span>
              <span className="bg-blue-500 text-white rounded-md">
                <Link href={`/experience`}>
                  <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" />
                </Link>
                <Trash
                  className="p-1 hover:scale-110 cursor-pointer transition-transform"
                  onClick={() => setExperienceDelete(true)}
                />
              </span>
            </div>

            {!ExperienceDelete && (
              <>
                <h2
                  className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Experience
                </h2>
                <ul className="space-y-3">
                  {Experience?.map((data, i) => (
                    <li key={i}>
                      <p className="font-semibold">
                        {data?.jobTitle} -{" "}
                        <span className="text-gray-700">{data?.employer}</span>{" "}
                        <span className="text-sm text-gray-500">
                          ({data?.startDate}/{data?.endDate})
                        </span>
                      </p>
                      <p className="text-gray-700 text-sm">{data?.jobDescription}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* EDUCATION */}
        {id === "education" && (
          <div
            className={`relative mb-6 ${hoverSections ? "border border-blue-400 rounded-xl p-3" : ""}`}
            onMouseEnter={() => sethoverSections(true)}
            onMouseLeave={() => sethoverSections(false)}
          >
            <div
              className={`absolute left-0 top-0 w-full flex justify-between ${
                hoverSections ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <span
                className="bg-blue-500 text-white rounded-md"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <Grip className="p-1" />
              </span>
              <span className="bg-blue-500 text-white rounded-md">
                <Link href={`/education`}>
                  <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" />
                </Link>
                <Trash
                  className="p-1 hover:scale-110 cursor-pointer transition-transform"
                  onClick={() => setEducationDelete(true)}
                />
              </span>
            </div>

            {!EducationDelete && (
              <>
                <h2
                  className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`}
                  style={{ fontSize: `${dynamicHeadingSize}px` }}
                >
                  Education
                </h2>
                <p className="font-medium text-gray-700">{Education?.degree}</p>
                <p className="text-gray-600 text-sm">
                  {Education?.schoolName} ({Education?.graduationDate})
                </p>
              </>
            )}
          </div>
        )}

        {/* DYNAMIC SECTIONS */}
        {activeDynamicSection && (
          <div
            className={`relative mb-6 ${hoverSections ? "border border-blue-400 rounded-xl p-3" : ""}`}
            onMouseEnter={() => sethoverSections(true)}
            onMouseLeave={() => sethoverSections(false)}
          >
            <div
              className={`absolute left-0 top-0 w-full flex justify-between ${
                hoverSections ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <span
                className="bg-blue-500 text-white rounded-md"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <Grip className="p-1" />
              </span>
              <span className="bg-blue-500 text-white rounded-md">
                <Link href={`/dynamicsectionupdate/${activeDynamicSection?.id}`}>
                  <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" />
                </Link>
                <Trash
                  className="p-1 hover:scale-110 cursor-pointer transition-transform"
                  onClick={(event) => {
                    event.stopPropagation();
                    const sectionId = activeDynamicSection?.id;
                    if (!sectionId) return;
                    DeleteDynamicSection(sectionId.toString());
                  }}
                />
              </span>
            </div>

            <h2
              className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`}
              style={{ fontSize: `${dynamicHeadingSize}px` }}
            >
              {activeDynamicSection?.Name}
            </h2>

            {activeDynamicSection?.dynamicSections?.blocks?.map((maindata, blockIndex) => {
              if (maindata?.type === "paragraph") {
                return (
                  <p
                    key={`p-${blockIndex}`}
                    className={`${dynamicfontStyle} text-gray-700 leading-relaxed`}
                    style={{ fontSize: `${dynamictextSize}px` }}
                  >
                    {maindata?.data?.text}
                  </p>
                );
              }
              if (maindata?.type === "header") {
                return (
                  <h3
                    key={`h-${blockIndex}`}
                    className={`${dynamicfontStyle} font-semibold text-gray-800 mt-3`}
                    style={{ fontSize: `${dynamictextSize + 1}px` }}
                  >
                    {maindata?.data?.text}
                  </h3>
                );
              }
              if (maindata?.type === "list") {
                if (maindata?.data?.style === "ordered") {
                  return (
                    <ol key={`ol-${blockIndex}`} className="list-decimal ml-5 space-y-1">
                      {maindata?.data?.items?.map((item: { content: string }, i: number) => (
                        <li key={i} className="text-gray-700" style={{ fontSize: `${dynamictextSize}px` }}>
                          {item.content}
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (maindata?.data?.style === "unordered") {
                  return (
                    <ul key={`ul-${blockIndex}`} className="list-disc ml-5 space-y-1">
                      {maindata?.data?.items?.map((item: { content: string }, i: number) => (
                        <li key={i} className="text-gray-700" style={{ fontSize: `${dynamictextSize}px` }}>
                          {item.content}
                        </li>
                      ))}
                    </ul>
                  );
                }
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
