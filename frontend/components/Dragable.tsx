"use client";

import { DynamicSectionsType, EducationInfo, ExperienceData, PersonalInfo } from '@/types/usestateTypes';
import { Grip, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { SortableBox2 } from './templates/template2/Dragable2';

type all = {
  dynamicName: number,
  dynamicHeadingSize: number,
  dynamictextSize: number,
  dynamicfontStyle: string,
};

function Template1({
  dynamicName,
  dynamicHeadingSize,
  dynamictextSize,
  dynamicfontStyle,
}: all) {
  const [PersnalInformation, setPersnalInformation] = useState<PersonalInfo>();
  const [Summary, setSummary] = useState<string>();
  const [Skills, setSkills] = useState<string[]>();
  const [Experience, setExperience] = useState<ExperienceData[]>();
  const [Education, setEducation] = useState<EducationInfo>();
  const [Drag, setDrag] = useState([
    { id: "header" },
    { id: "persnalInformation" },
    { id: "skills" },
    { id: "experience" },
    { id: "education" },
  ]);
  const [dynamicSection, setdynamicSection] = useState<DynamicSectionsType[]>();
  const [hoverSections, sethoverSections] = useState(false);

  // 🧩 Merge dynamic sections into Drag
  useEffect(() => {
    if (dynamicSection) {
      setDrag(prev => [
        ...prev,
        ...dynamicSection.map(d => ({ id: d.id.toString() })),
      ]);
    }
  }, [dynamicSection]);

  // 🧠 Handle Drag & Drop reorder
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setDrag(prev => {
      const oldIndex = prev.findIndex(b => b.id === active.id);
      const newIndex = prev.findIndex(b => b.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // 💾 Load localStorage data
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

  // 🖨️ Ref for print area
  const componentRef = useRef<HTMLDivElement>(null);

  // 🖨️ React-to-Print setup
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // ✅ new API
    documentTitle: `${PersnalInformation?.firstName || "resume"}_cv`,
  });

  return (
    <div className="flex flex-col items-center">
      

      {/* Printable Section */}
      <div
        ref={componentRef}
        className="max-w-3xl mx-auto bg-white text-black p-8 shadow-lg border overflow-y-scroll"
      >
        {/* Header */}
        {/* <div
          className={`text-center mb-6 relative ${hoverSections ? "border-2 border-blue-500 pl-2" : ""}`}
          onMouseEnter={() => sethoverSections(true)}
          onMouseLeave={() => sethoverSections(false)}
        >
          <div
            className={`absolute left-0 z-40 flex justify-between w-full ${hoverSections ? "block" : "hidden"}`}
          >
            <span className="bg-blue-500 text-white h-fit">
              <Grip className="p-1" />
            </span>
            <span className="bg-blue-500 text-white flex">
              <Link href={`/persnalinfo`}>
                <Pencil className="p-1 hover:scale-[1.2] cursor-pointer" />
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer" />
            </span>
          </div>

          <span className="flex justify-center mb-1 gap-x-2">
            <h1
              className={`font-bold ${dynamicfontStyle}`}
              style={{ fontSize: `${dynamicName}px` }}
            >
              {PersnalInformation?.firstName}
            </h1>
            <h1
              className={`font-bold ${dynamicfontStyle}`}
              style={{ fontSize: `${dynamicName}px` }}
            >
              {PersnalInformation?.lastName}
            </h1>
          </span>

          <p
            className={`text-gray-600 ${dynamicfontStyle}`}
            style={{ fontSize: `${dynamictextSize}px` }}
          >
            {PersnalInformation?.Profession}
          </p>
          <p
            className={`text-gray-500 ${dynamicfontStyle}`}
            style={{ fontSize: `${dynamictextSize}px` }}
          >
            {PersnalInformation?.email} | {PersnalInformation?.phone} |{" "}
            {PersnalInformation?.city}, {PersnalInformation?.country}
          </p>
        </div> */}

        {/* Drag & Drop Section */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={Drag.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-4 h-fit">
              {Drag.map((d) => (
                <SortableBox2
                  key={d.id}
                  id={d.id}
                  dynamicHeadingSize={dynamicHeadingSize}
                  Summary={Summary}
                  Skills={Skills}
                  dynamictextSize={dynamictextSize}
                  Experience={Experience}
                  Education={Education}
                  dynamicfontStyle={dynamicfontStyle}
                  dynamicSection={dynamicSection}
                  dynamicName={dynamicName}
                  PersnalInformation={PersnalInformation}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      {/* Print Button */}
      <div className="my-4">
        <Button onClick={handlePrint}>Download PDF</Button>
      </div>
    </div>
  );
}

export default Template1;
