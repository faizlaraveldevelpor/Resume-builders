// "use client";
// import { DynamicSectionsType, EducationInfo, ExperienceData, PersonalInfo } from "@/types/usestateTypes";
// import { Grip, Pencil, Trash } from "lucide-react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
// import { SortableBox } from "../Drageable"; // 🔹 same as Template1 me tha

// type all = { dynamicName: number; dynamicHeadingSize: number; dynamictextSize: number; dynamicfontStyle: string };

// function Resume2({ dynamicName, dynamicHeadingSize, dynamictextSize, dynamicfontStyle }: all) {
//   const [PersnalInformation, setPersnalInformation] = useState<PersonalInfo>();
//   const [Summary, setSummary] = useState<string>();
//   const [Skills, setSkills] = useState<string[]>();
//   const [Experience, setExperience] = useState<ExperienceData[]>();
//   const [Education, setEducation] = useState<EducationInfo>();
//   const [dynamicSection, setdynamicSection] = useState<DynamicSectionsType[]>([]);
//   const [hoverSections, sethoverSections] = useState(false);

//   const [SummaryDelete, setSummaryDelete] = useState(false);
//   const [SkillsDelete, setSkillsDelete] = useState(false);
//   const [ExperienceDelete, setExperienceDelete] = useState(false);
//   const [EducationDelete, setEducationDelete] = useState(false);

//   // 🧩 Drag state
//   const [Drag, setDrag] = useState([
//     { id: "summary" },
//     { id: "experience" },
//     { id: "education" },
//     { id: "skills" },
//     { id: "dynamic" },
//     { id: "contact" },
//   ]);

//   useEffect(() => {
//     const pers = localStorage.getItem("persnalInformation");
//     if (pers) setPersnalInformation(JSON.parse(pers));
//     const sum = localStorage.getItem("summary");
//     if (sum) setSummary(JSON.parse(sum));
//     const skl = localStorage.getItem("skills");
//     if (skl) setSkills(JSON.parse(skl));
//     const exp = localStorage.getItem("experiance");
//     if (exp) setExperience(JSON.parse(exp));
//     const edu = localStorage.getItem("education");
//     if (edu) setEducation(JSON.parse(edu));
//     const dyn = localStorage.getItem("dynamicsections");
//     if (dyn) setdynamicSection(JSON.parse(dyn));
//   }, []);

//   // 🧠 Handle drag reorder
//   const handleDragEnd = ({ active, over }: DragEndEvent) => {
//     if (!over || active.id === over.id) return;
//     setDrag((prev) => {
//       const oldIndex = prev.findIndex((b) => b.id === active.id);
//       const newIndex = prev.findIndex((b) => b.id === over.id);
//       return arrayMove(prev, oldIndex, newIndex);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-3">
//         {/* 🟦 Left Content */}
//         <div className="col-span-2 p-8">
//           <div
//             className={`mb-6 ${hoverSections ? "ring-2 ring-blue-300" : ""}`}
//             onMouseEnter={() => sethoverSections(true)}
//             onMouseLeave={() => sethoverSections(false)}
//           >
//             <h1
//               className={`text-3xl font-extrabold ${dynamicfontStyle}`}
//               style={{ fontSize: `${dynamicName}px` }}
//             >
//               {PersnalInformation?.firstName} {PersnalInformation?.lastName}
//             </h1>
//             <p
//               className={`text-sm font-semibold text-gray-600 ${dynamicfontStyle}`}
//               style={{ fontSize: `${dynamictextSize}px` }}
//             >
//               {PersnalInformation?.Profession}
//             </p>
//             <div className="mt-3 text-gray-700" style={{ fontSize: `${dynamictextSize}px` }}>
//               {PersnalInformation?.email} • {PersnalInformation?.phone}
//             </div>
//           </div>

//           {/* 🔹 DnD Context for reorder */}
//           <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={Drag.map((b) => b.id)} strategy={verticalListSortingStrategy}>
//               <div className="flex flex-col gap-6">
//                 {Drag.map((d) => (
//                   <SortableBox key={d.id} id={d.id}>
//                     {/* Summary */}
//                     {d.id === "summary" && !SummaryDelete && Summary && (
//                       <section className="mb-6">
//                         <h2
//                           className={`text-lg font-semibold border-b pb-1 ${dynamicfontStyle}`}
//                           style={{ fontSize: `${dynamicHeadingSize}px` }}
//                         >
//                           Summary
//                         </h2>
//                         <p
//                           className={`${dynamicfontStyle} mt-2`}
//                           style={{ fontSize: `${dynamictextSize}px` }}
//                         >
//                           {Summary}
//                         </p>
//                       </section>
//                     )}

//                     {/* Experience */}
//                     {d.id === "experience" && !ExperienceDelete && Experience && (
//                       <section className="mb-6">
//                         <h2
//                           className={`text-lg font-semibold border-b pb-1 ${dynamicfontStyle}`}
//                           style={{ fontSize: `${dynamicHeadingSize}px` }}
//                         >
//                           Experience
//                         </h2>
//                         <div className="mt-3 space-y-4">
//                           {Experience.map((exp, i) => (
//                             <div key={i} className="pb-2">
//                               <div className="flex justify-between items-baseline">
//                                 <strong style={{ fontSize: `${dynamictextSize}px` }}>
//                                   {exp?.jobTitle}
//                                 </strong>
//                                 <span
//                                   className="text-sm text-gray-500"
//                                   style={{ fontSize: `${dynamictextSize - 2}px` }}
//                                 >
//                                   {exp?.startDate} - {exp?.endDate}
//                                 </span>
//                               </div>
//                               <div
//                                 className="text-gray-700"
//                                 style={{ fontSize: `${dynamictextSize}px` }}
//                               >
//                                 {exp?.employer}
//                               </div>
//                               <p className="mt-1" style={{ fontSize: `${dynamictextSize}px` }}>
//                                 {exp?.jobDescription}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </section>
//                     )}

//                     {/* Education */}
//                     {d.id === "education" && !EducationDelete && Education && (
//                       <section className="mb-6">
//                         <h2
//                           className={`text-lg font-semibold border-b pb-1 ${dynamicfontStyle}`}
//                           style={{ fontSize: `${dynamicHeadingSize}px` }}
//                         >
//                           Education
//                         </h2>
//                         <div className="mt-3 text-gray-700" style={{ fontSize: `${dynamictextSize}px` }}>
//                           <p>{Education?.degree}</p>
//                           <p>{Education?.school}</p>
//                           <p>
//                             {Education?.startYear} - {Education?.endYear}
//                           </p>
//                         </div>
//                       </section>
//                     )}

//                     {/* Dynamic sections */}
//                     {d.id === "dynamic" &&
//                       dynamicSection?.length > 0 &&
//                       dynamicSection.map((data, index) => (
//                         <div key={index} className="mb-4">
//                           <h3
//                             className="font-semibold"
//                             style={{ fontSize: `${dynamicHeadingSize}px` }}
//                           >
//                             {data?.Name}
//                           </h3>
//                           {data?.dynamicSections?.blocks?.map((block, blockIndex) => {
//                             if (block?.type === "paragraph")
//                               return (
//                                 <p
//                                   key={`p-${index}-${blockIndex}`}
//                                   className={`${dynamicfontStyle}`}
//                                   style={{ fontSize: `${dynamictextSize}px` }}
//                                 >
//                                   {block?.data?.text}
//                                 </p>
//                               );
//                             if (block?.type === "header")
//                               return (
//                                 <h3
//                                   key={`h-${index}-${blockIndex}`}
//                                   className={`${dynamicfontStyle} font-semibold mt-4`}
//                                   style={{ fontSize: `${dynamictextSize + 1}px` }}
//                                 >
//                                   {block?.data?.text}
//                                 </h3>
//                               );
//                             if (block?.type === "list") {
//                               const items = block?.data?.items || [];
//                               return block?.data?.style === "ordered" ? (
//                                 <ol key={`ol-${index}-${blockIndex}`} className="ml-4 list-decimal">
//                                   {items.map((it: { content: string }, i: number) => (
//                                     <li key={i} style={{ fontSize: `${dynamictextSize}px` }}>
//                                       {typeof it === "string" ? it : it?.content || ""}
//                                     </li>
//                                   ))}
//                                 </ol>
//                               ) : (
//                                 <ul key={`ul-${index}-${blockIndex}`} className="ml-4 list-disc">
//                                   {items.map((it: { content: string }, i: number) => (
//                                     <li key={i} style={{ fontSize: `${dynamictextSize}px` }}>
//                                       {typeof it === "string" ? it : it?.content || ""}
//                                     </li>
//                                   ))}
//                                 </ul>
//                               );
//                             }
//                             return null;
//                           })}
//                         </div>
//                       ))}

//                     {/* Sidebar Contact + Skills */}
//                     {d.id === "contact" && (
//                       <aside className="bg-gray-100 p-6 border-l rounded-md">
//                         <div className="text-center mb-6">
//                           <div
//                             className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow ${dynamicfontStyle}`}
//                           >
//                             <span className="text-xl font-bold">
//                               {PersnalInformation?.firstName?.[0] || ""}
//                               {PersnalInformation?.lastName?.[0] || ""}
//                             </span>
//                           </div>
//                           <div
//                             className="mt-4 text-sm text-gray-700"
//                             style={{ fontSize: `${dynamictextSize}px` }}
//                           >
//                             {PersnalInformation?.city}, {PersnalInformation?.country}
//                           </div>
//                         </div>

//                         <div className="mb-6">
//                           <h4
//                             className={`font-semibold text-gray-700 ${dynamicfontStyle}`}
//                             style={{ fontSize: `${dynamicHeadingSize}px` }}
//                           >
//                             Contact
//                           </h4>
//                           <div
//                             className="mt-2 text-gray-700"
//                             style={{ fontSize: `${dynamictextSize}px` }}
//                           >
//                             <div>{PersnalInformation?.email}</div>
//                             <div>{PersnalInformation?.phone}</div>
//                           </div>
//                         </div>

//                         {Skills && !SkillsDelete && (
//                           <div>
//                             <h4
//                               className={`font-semibold text-gray-700 ${dynamicfontStyle}`}
//                               style={{ fontSize: `${dynamicHeadingSize}px` }}
//                             >
//                               Skills
//                             </h4>
//                             <div className="mt-2 flex flex-wrap gap-2">
//                               {Skills.map((s, i) => (
//                                 <span
//                                   key={i}
//                                   className="px-2 py-1 bg-white rounded text-sm"
//                                   style={{ fontSize: `${dynamictextSize}px` }}
//                                 >
//                                   {s}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </aside>
//                     )}
//                   </SortableBox>
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Resume2;
