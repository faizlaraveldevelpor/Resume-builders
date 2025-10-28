"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import {
  DynamicSectionsType,
  EducationInfo,
  ExperienceData,
  PersonalInfo,
} from "@/types/usestateTypes";
import { useRouter } from "next/navigation";

// --- Helper types ---
type Props = {
  dynamicName: number;
  dynamicHeadingSize: number;
  dynamictextSize: number;
  dynamicfontStyle: string;
};

type ItemId = string;

// --- Sortable item (inlined component) ---
function SortableItem({
  id,
  children,
  onDelete,
  enableDragHandle = true,
}: {
  id: ItemId;
  children: React.ReactNode;
  onDelete?: () => void;
  enableDragHandle?: boolean;
}) {
  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, transition } =
    useSortable({ id });
const route=useRouter()
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [hover, setHover] = useState(false);
const editsection=(id:number|string)=>{
  console.log(id)
switch (id) {
  case "skills":
    route.push('skills')
  case "header":
    route.push('persnalinfo')
    break;
  case "education":
    route.push('education')
    break;
  case "experience":
    route.push('experience')
    break;
  case "persnalInformation":
    route.push('summary')
    break;
 

  default:
    break;

}
if (id!=="skills"&&id!=="header"&&id!=="education"&&id!=="experience"&&id!=="persnalInformation") {
  route.push(`dynamicsectionupdate/${id}`)
}
}
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white shadow rounded-2xl p-4 border border-gray-200 transition-all"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <div
          className={`absolute left-0 top-0 w-full flex justify-between p-1 transition-opacity ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="bg-blue-500 text-white rounded-md"
            ref={setActivatorNodeRef}
            {...attributes}
            {...(enableDragHandle ? listeners : {})}
          >
            <Grip className="p-1" />
          </span>
          <span className="bg-blue-500 text-white rounded-md flex">
            <Pencil className="p-1 hover:scale-110 cursor-pointer transition-transform" onClick={()=>editsection(id)}/>
            <Trash
              className="p-1 hover:scale-110 cursor-pointer transition-transform"
              onClick={() => onDelete && onDelete()}
            />
          </span>
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

// --- Main two-column template ---
export default function Template3({
  dynamicName,
  dynamicHeadingSize,
  dynamictextSize,
  dynamicfontStyle,
}: Props) {
  // Left and right column item ids
  const [leftItems, setLeftItems] = useState<ItemId[]>([
    "header",
    "skills",
  ]);
  const [rightItems, setRightItems] = useState<ItemId[]>([
    "persnalInformation",
    "experience",
    "education",
    // dynamic sections will be appended after load
  ]);

  const [PersnalInformation, setPersnalInformation] = useState<PersonalInfo>();
  const [Summary, setSummary] = useState<string | undefined>();
  const [Skills, setSkills] = useState<string[] | undefined>([]);
  const [Experience, setExperience] = useState<ExperienceData[] | undefined>([]);
  const [Education, setEducation] = useState<EducationInfo | undefined>();
  const [dynamicSection, setdynamicSection] = useState<DynamicSectionsType[] | undefined>([]);

  // load from localStorage (same approach as original)

  useEffect(() => {
  const hasLoadedRef = { current: false }; // local guard to avoid multiple runs
  if (hasLoadedRef.current) return;
  hasLoadedRef.current = true;

  try {
    const pers = localStorage.getItem("persnalInformation");
    if (pers && pers !== "undefined") setPersnalInformation(JSON.parse(pers));

    const sum = localStorage.getItem("summary");
    if (sum && sum !== "undefined") setSummary(JSON.parse(sum));

    const skl = localStorage.getItem("skills");
    if (skl && skl !== "undefined") setSkills(JSON.parse(skl));

    const exp = localStorage.getItem("experiance");
    if (exp && exp !== "undefined") {
      const parse = JSON.parse(exp);
      if (Array.isArray(parse)) {
        setExperience(parse);
      } else {
        setExperience([parse]);
      }
    }

    const edu = localStorage.getItem("education");
    if (edu && edu !== "undefined") setEducation(JSON.parse(edu));

    // ✅ Dynamic sections
    const dyn = localStorage.getItem("dynamicsections");
    if (dyn && dyn !== "undefined") {
      let parsed = JSON.parse(dyn) as DynamicSectionsType[];

      // 🧹 Remove duplicate IDs if any
      const seen = new Set();
      parsed = parsed.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });

      // 🧩 Save unique back to localStorage
      localStorage.setItem("dynamicsections", JSON.stringify(parsed));
      setdynamicSection(parsed);

      // ✅ Append unique dynamic IDs to rightItems (no duplicates)
      setRightItems((prev) => {
        const newIds = parsed
          .map((p) => p.id.toString())
          .filter((id) => !prev.includes(id));
        return [...prev, ...newIds];
      });
    }
  } catch (e) {
    console.warn("failed parsing localStorage for resume data", e);
  }
}, []);

  console.log(Experience)
// 🖨️ Ref for print area
  const componentRef = useRef<HTMLDivElement>(null);

  // 🖨️ React-to-Print setup
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // ✅ new API
    documentTitle: `${PersnalInformation?.firstName || "resume"}_cv`,
  });
  

  // sensors (pointer sensor supports both axes)
  const sensors = useSensors(useSensor(PointerSensor));

  // helper to find container name by id
  const findContainer = (id: ItemId) => {
    if (leftItems.includes(id)) return "left";
    if (rightItems.includes(id)) return "right";
    return null;
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as ItemId;
    const overId = over.id as ItemId;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    // same container -> reorder
    if (activeContainer && activeContainer === overContainer) {
      if (activeContainer === "left") {
        const oldIndex = leftItems.indexOf(activeId);
        const newIndex = leftItems.indexOf(overId);
        if (oldIndex !== -1 && newIndex !== -1) {
          setLeftItems((items) => arrayMove(items, oldIndex, newIndex));
        }
      } else if (activeContainer === "right") {
        const oldIndex = rightItems.indexOf(activeId);
        const newIndex = rightItems.indexOf(overId);
        if (oldIndex !== -1 && newIndex !== -1) {
          setRightItems((items) => arrayMove(items, oldIndex, newIndex));
        }
      }
      return;
    }

    // moving between containers
    if (activeContainer && overContainer && activeContainer !== overContainer) {
      if (activeContainer === "left" && overContainer === "right") {
        setLeftItems((items) => items.filter((i) => i !== activeId));
        const overIndex = rightItems.indexOf(overId);
        setRightItems((items) => {
          const copy = [...items];
          copy.splice(overIndex + 0, 0, activeId);
          return copy;
        });
      } else if (activeContainer === "right" && overContainer === "left") {
        setRightItems((items) => items.filter((i) => i !== activeId));
        const overIndex = leftItems.indexOf(overId);
        setLeftItems((items) => {
          const copy = [...items];
          copy.splice(overIndex + 0, 0, activeId);
          return copy;
        });
      }
    }
  };

  // delete dynamic section helper
  const deleteDynamicSection = (sectionId: string) => {
    const filtered = (dynamicSection ?? []).filter((d) => d.id.toString() !== sectionId);
    setdynamicSection(filtered);
    localStorage.setItem("dynamicsections", JSON.stringify(filtered));
    setRightItems((items) => items.filter((i) => i !== sectionId));
  };

  // generic delete handlers for built-in sections (hide by removing from arrays)
  const removeFromLeft = (id: ItemId) => setLeftItems((s) => s.filter((i) => i !== id));
  const removeFromRight = (id: ItemId) => setRightItems((s) => s.filter((i) => i !== id));

  // helpers to render content
  const renderItemContent = (id: ItemId) => {
    if (id === "header") {
      return (
        <div className="flex flex-col">
          <h1 className={`font-bold ${dynamicfontStyle}`} style={{ fontSize: `${dynamicName + 2}px` }}>
            {PersnalInformation?.firstName} {PersnalInformation?.lastName}
          </h1>
          <p className={`${dynamicfontStyle} text-sm`} style={{ fontSize: `${dynamictextSize}px` }}>
            {PersnalInformation?.Profession}
          </p>
          <p className={`text-gray-600 ${dynamicfontStyle} text-xs`} style={{ fontSize: `${dynamictextSize - 1}px` }}>
            {PersnalInformation?.email} • {PersnalInformation?.phone}
          </p>
        </div>
      );
    }

    if (id === "skills") {
      return (
        <div>
          <h2 className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {Skills?.map((s, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (id === "persnalInformation") {
      return (
        <div>
          <h2 className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>
            Summary
          </h2>
          <p className={`${dynamicfontStyle} text-gray-700`} style={{ fontSize: `${dynamictextSize}px` }}>
            {Summary}
          </p>
        </div>
      );
    }

    if (id === "experience") {
      return (
        <div>
          <h2 className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>
            Experience
          </h2>
          <ul className="space-y-3">
            {Experience?.map((e, i) => (
              <li key={i}>
                <p className="font-semibold">
                  {e?.jobTitle} - <span className="text-gray-700">{e?.employer}</span>{" "}
                  <span className="text-sm text-gray-500">({e?.startDate}/{e?.endDate})</span>
                </p>
                <p className="text-gray-700 text-sm">{e?.jobDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (id === "education") {
      return (
        <div>
          <h2 className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>
            Education
          </h2>
          <p className="font-medium text-gray-700">{Education?.degree}</p>
          <p className="text-gray-600 text-sm">{Education?.schoolName} ({Education?.graduationDate})</p>
        </div>
      );
    }

    // dynamic sections
    const dyn = dynamicSection?.find((d) => d.id.toString() === id);
    if (dyn) {
      return (
        <div>
          <h2 className={`${dynamicfontStyle} font-semibold text-blue-700 border-b pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>
            {dyn?.Name}
          </h2>
          {dyn?.dynamicSections?.blocks?.map((block, bi) => {
            if (block.type === "paragraph") {
              return (
                <p key={bi} className={`${dynamicfontStyle} text-gray-700`} style={{ fontSize: `${dynamictextSize}px` }}>
                  {block.data?.text}
                </p>
              );
            }
            if (block.type === "list") {
              if (block.data?.style === "unordered") {
                return (
                  <ul key={bi} className="list-disc ml-5 space-y-1">
                    {block.data?.items?.map((it:{ content: string }, i: number) => (
                      <li key={i} style={{ fontSize: `${dynamictextSize}px` }}>{it.content}</li>
                    ))}
                  </ul>
                );
              }
              if (block.data?.style === "ordered") {
                return (
                  <ol key={bi} className="list-decimal ml-5 space-y-1">
                    {block.data?.items?.map((it: { content: string }, i: number) => (
                      <li key={i} style={{ fontSize: `${dynamictextSize}px` }}>{it.content}</li>
                    ))}
                  </ol>
                );
              }
            }
            if (block.type === "header") {
              return (
                <h3 key={bi} className={`${dynamicfontStyle} font-semibold`} style={{ fontSize: `${dynamictextSize + 1}px` }}>
                  {block.data?.text}
                </h3>
              );
            }
            return null;
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div ref={componentRef} className="w-full max-w-5xl bg-white text-black p-6 shadow-lg rounded-lg">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN (droppable) */}
            <SortableContext items={leftItems} strategy={rectSortingStrategy}>
              <div className="space-y-4">
                {leftItems.map((id) => (
                  <SortableItem key={id} id={id} onDelete={() => removeFromLeft(id)}>
                    {renderItemContent(id)}
                  </SortableItem>
                ))}
              </div>
            </SortableContext>

            {/* RIGHT COLUMN (droppable) */}
            <SortableContext items={rightItems} strategy={rectSortingStrategy}>
              <div className="space-y-4">
                {rightItems.map((id) => (
                  <SortableItem key={id} id={id} onDelete={() => {
                    // if it's dynamic, delete specially
                    const dyn = dynamicSection?.find((d) => d.id.toString() === id);
                    if (dyn) deleteDynamicSection(id);
                    else removeFromRight(id);
                  }}>
                    {renderItemContent(id)}
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </div>
        </DndContext>
      </div>

      <div className="mt-4">
        <Button onClick={handlePrint}>Download PDF</Button>
      </div>
    </div>
  );
}
