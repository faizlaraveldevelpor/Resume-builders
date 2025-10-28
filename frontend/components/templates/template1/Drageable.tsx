"use client";
import { useGetDocomentApiQuery } from "@/lib/docoment";
import { DynamicSectionsType, EducationInfo, ExperienceData,PersonalInfo } from "@/types/usestateTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dot, Grip, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback,  useMemo, useState } from "react";
type allFieldsType={
id:string,
dynamicHeadingSize:number,
Summary:string|undefined,
Skills:string[]|undefined,
dynamictextSize:number,
Experience:ExperienceData[]|undefined,
Education:EducationInfo|undefined,
dynamicfontStyle:string,
 dynamicSection:DynamicSectionsType[]|undefined
 dynamicName:number
 PersnalInformation:PersonalInfo|undefined
}
export function SortableBox({ id,dynamicHeadingSize,Summary,Skills,dynamictextSize,Experience,Education,dynamicfontStyle,dynamicSection,dynamicName,PersnalInformation }:allFieldsType) {
  const {data}=useGetDocomentApiQuery("")
  console.log(data);
  
    const [hoverSections,sethoverSections]=useState(false)
    const [SummaryDelete,setSummaryDelete]=useState(false)
    const [SkillsDelete,setSkillsDelete]=useState(false)
    const [ExperienceDelete,setExperienceDelete]=useState(false)
    const [EducationDelete,setEducationDelete]=useState(false)
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

const DeleteDynamicSection=useCallback((sectionId:string)=>{
  const FilterDeletedDynamicSection=(dynamicSection ?? []).filter((data)=>data?.id?.toString()!==sectionId);
  localStorage.setItem("dynamicsections",JSON.stringify(FilterDeletedDynamicSection));
},[dynamicSection]);
console.log(Experience)
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="  cursor-grab active:cursor-grabbing "
    >
      <div className="flex w-full">
         <div className=" text-black flex flex-col h-full w-full  " >
          
            <div>
              {
                id=="header"?<>
                <div
                          className={`text-center mb-6 relative ${hoverSections ? "border-2 border-blue-500 pl-2" : ""}`}
                          onMouseEnter={() => sethoverSections(true)}
                          onMouseLeave={() => sethoverSections(false)}
                          ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
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
                        </div>
                </>:""
              }
            </div>
           <div>
            {
                id=="persnalInformation"?<div className={`relative ${hoverSections==true?"border-2  border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
                   <div className={`absolute left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"}`}>
            <span
              className="bg-blue-500 text-white h-fit"
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <Grip className="p-1"/>
            </span>
            <span className="bg-blue-500 text-white">
              <Link href={`/summary`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer" onClick={()=>setSummaryDelete(true)}/>
            </span>
          </div>
          <h2 className={` font-semibold border-b pb-1 mb-2 ${SummaryDelete==true?"hidden":"block"} ${dynamicfontStyle} `} style={{ fontSize: `${dynamicHeadingSize}px` }}>Summary</h2>
          <p className={`${dynamicfontStyle} ${SummaryDelete==true?"hidden":"block"}`} style={{ fontSize: `${dynamictextSize}px` }}>
            {Summary}
          </p>
        </div>:""
            }
            {
                id=="skills"?<>
                <div className={`relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
                 <div className={`absolute  left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"} `}>
            <span
              className="bg-blue-500 text-white h-fit"
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <Grip className="p-1"/>
            </span>
            <span className="bg-blue-500 text-white">
              <Link href={`/skills`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer" onClick={()=>setSkillsDelete(true)}/>
            </span>
          </div>
          <h2 className={`  font-semibold border-b pb-1 mb-2 ${SkillsDelete==true?"hidden":"block"} ${dynamicfontStyle}`}  style={{ fontSize: `${dynamicHeadingSize}px` }}>Skills</h2>
          <div className={`flex flex-wrap gap-x-1 mt-3 ${SkillsDelete==true?"hidden":"block"}`}>
                
            {Skills?.map((data,i)=>{
            return(
                <>
                <div className='' key={i}>

                <p  className={`${dynamicfontStyle} font-semibold`} style={{ fontSize: `${dynamictextSize}px` }}>{data},</p>
                </div>
                </>
            )
          })}
          </div>
        </div>
                
                </>:""
            }
          {
            id=="experience"?<div className={`relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
                <div className={`absolute  left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"} `}>
            <span
              className="bg-blue-500 text-white h-fit"
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <Grip className="p-1"/>
            </span>
            <span className="bg-blue-500 text-white">
              <Link href={`experience`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer" onClick={()=>setExperienceDelete(true)}/>
            </span>
          </div>
          <h2 className={` ${dynamicfontStyle}  font-semibold border-b pb-1 mb-2 ${ExperienceDelete==true?"hidden":"block"}`} style={{ fontSize: `${dynamicHeadingSize}px` }}>Experience</h2>
          <ul className={`${dynamicfontStyle} list-disc list-inside ${ExperienceDelete==true?"hidden":"block"}`}>
            {
              Experience?.map((data,i)=>{
                return(
                  <>
                  <li key={i}>
              <strong  style={{fontSize:`${dynamictextSize}px`}}>{data?.jobTitle}</strong> - {data?.employer} ({data?.startDate+"/"+data?.endDate})
              <p  style={{fontSize:`${dynamictextSize}px`}}>{data?.jobDescription}</p>
            </li>
            
                  </>
                )
              })
            }
          </ul>
        </div>:""
          }
          {id=="education"?<div className={`mb-4 ${dynamicfontStyle} relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)} >
             <div className={`absolute  left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"} `}>
            <span
              className="bg-blue-500 text-white h-fit"
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <Grip className="p-1"/>
            </span>
            <span className="bg-blue-500 text-white">
              <Link href={`/education`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer" onClick={()=>setEducationDelete(true)}/>
            </span>
          </div>
          <div className={`flex justify-between w-full border-b ${EducationDelete==true?"hidden":"block"}`}>
          <h2 className={`${dynamicfontStyle} font-semibold  pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>Education</h2>
          </div>
          <p className={`${dynamicfontStyle} mt-3 ${EducationDelete==true?"hidden":"block"}`} style={{fontSize:`${dynamictextSize}px`}}>{Education?.degree}</p>
          <p className={`${dynamicfontStyle} ${EducationDelete==true?"hidden":"block"}`} style={{fontSize:`${dynamictextSize}px`}}>{Education?.schoolName} ({Education?.graduationDate})</p>
        </div>:""}</div>
        
        {/* dynamic sections */}
        {activeDynamicSection && (
          
            
          <div
            className={` relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`}
            onMouseEnter={()=>sethoverSections(true)}
            onMouseLeave={()=>sethoverSections(false)}
          >
            <div className={`absolute  left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"} `}>
              <span
                className="bg-blue-500 text-white h-fit"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <Grip className="p-1"/>
              </span>
              <span className="bg-blue-500 text-white" >
                <Link href={`/dynamicsectionupdate/${activeDynamicSection?.id}`}>
                  <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
                </Link>
                <Trash
                  className="p-1 hover:scale-[1.2] cursor-pointer"
                  onClick={(event)=>{
                    event.stopPropagation();
                    const sectionId = activeDynamicSection?.id;
                    if (!sectionId) {
                      return;
                    }
                    DeleteDynamicSection(sectionId.toString());
                  }}
                />
              </span>
            </div>
            <div className={`mb-4 ${dynamicfontStyle}`}>
              <div className='flex justify-between w-full border-b'>
                <h2 className={`${dynamicfontStyle} font-semibold  pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>{activeDynamicSection?.Name}</h2>
              </div>
            </div>
            {activeDynamicSection?.dynamicSections?.blocks?.map((maindata,blockIndex)=>{
              if (maindata?.type=="paragraph") {
                return(
                  <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }} key={`paragraph-${blockIndex}`}>
                    {maindata?.data?.text}
                  </p>
                );
              }
              if (maindata?.type=="header") {
                return(
                  <h2 className={`${dynamicfontStyle} font-semibold  pb-1 mb-2`} style={{ fontSize: `${dynamictextSize+1}px` }} key={`header-${blockIndex}`}>
                    {maindata?.data?.text}
                  </h2>
                );
              }
              if (maindata?.type=="list") {
                if (maindata?.data?.style=="ordered") {
                  return(
                    <ol className="mt-1" key={`ordered-${blockIndex}`}>
                      {maindata?.data?.items?.map((orderData:{content:string},itemIndex:number)=>(
                        <li className={`flex ml-1 ${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }} key={`ordered-item-${itemIndex}`}>
                          <span className="mr-1">{itemIndex+1}</span>{orderData?.content}
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (maindata?.data?.style=="unordered") {
                  return(
                    <ul className="mt-1" key={`unordered-${blockIndex}`}>
                      {maindata?.data?.items?.map((orderData:{content:string},itemIndex:number)=>(
                        <li className={`flex ${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }} key={`unordered-item-${itemIndex}`}>
                          <span className=""><Dot/></span>{orderData?.content}
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
      <div className="">

      </div>

      </div>
       
      
    </div>
  );
}

