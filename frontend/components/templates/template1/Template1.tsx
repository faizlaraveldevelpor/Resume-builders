"use client";

import { DynamicSectionsType, EducationInfo, ExperienceData, PersonalInfo } from '@/types/usestateTypes';
import { Grip, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { SortableContext, verticalListSortingStrategy, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableBox } from './Drageable';
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

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
    console.log(pers);
    
    if (pers !=="undefined") setPersnalInformation(JSON.parse(pers!));

    const sum = localStorage.getItem("summary");
    if (sum !=="undefined") setSummary(JSON.parse(sum!));

    const skl = localStorage.getItem("skills");
    if (skl !=="undefined") setSkills(JSON.parse(skl!));

    const exp = localStorage.getItem("experiance");
    const parse=JSON.parse(exp || "")
     if (exp!=="undefined"&& pers!==null) {
      if (Array.isArray(parse)) {
      setExperience(parse);
        
      }else{
        setExperience(([parse]))
      }}

    const edu = localStorage.getItem("education");
    if (edu !=="undefined") setEducation(JSON.parse(edu!));

    const dyn = localStorage.getItem("dynamicsections");
    if (dyn !=="undefined") setdynamicSection(JSON.parse(dyn!));
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
      

        {/* Drag & Drop Section */}
        <DndContext  collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={Drag.map(b => b.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-col gap-4 h-fit">
              {Drag.map((d) => (
                <SortableBox
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
