"use client";
import { DynamicSectionsType, EducationInfo, ExperienceData } from "@/types/usestateTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dot, Grip, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
}
export function SortableBox({ id,dynamicHeadingSize,Summary,Skills,dynamictextSize,Experience,Education,dynamicfontStyle,dynamicSection }:allFieldsType) {
    const [hoverSections,sethoverSections]=useState(false)
    
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    
  };

// console.log(dynamicSection);
const DeleteDynamicSection=(sectionId:string)=>{
  alert(
    "dfadfsafad"
  )
  console.log("faiz")

const FilterDeletedDynamicSection=dynamicSection?.filter((data)=>data?.id?.toString()!==sectionId)
localStorage.setItem("dynamicsections",FilterDeletedDynamicSection)
}
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="  cursor-grab active:cursor-grabbing "
    >
        <div className=" text-black h-fit">
         
            {
                id=="persnalInformation"?<div className={`relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
                   <div className={`absolute left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"}`}>
            <span className="bg-blue-500 text-white h-fit"><Grip className="p-1"/></span>
            <span className="bg-blue-500 text-white">
              <Link href={`/summary`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer"/>
            </span>
          </div>
          <h2 className={` font-semibold border-b pb-1 mb-2 ${dynamicfontStyle} `} style={{ fontSize: `${dynamicHeadingSize}px` }}>Summary</h2>
          <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}>
            {Summary}
          </p>
        </div>:""
            }
            {
                id=="skills"?<>
                <div className={`relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
                 <div className={`absolute  left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"} `}>
            <span className="bg-blue-500 text-white h-fit"><Grip className="p-1"/></span>
            <span className="bg-blue-500 text-white">
              <Link href={`/skills`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer"/>
            </span>
          </div>
          <h2 className={`  font-semibold border-b pb-1 mb-2  ${dynamicfontStyle}`}  style={{ fontSize: `${dynamicHeadingSize}px` }}>Skills</h2>
          <div className={`flex flex-wrap gap-x-1 mt-3 `}>
                
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
            <span className="bg-blue-500 text-white h-fit"><Grip className="p-1"/></span>
            <span className="bg-blue-500 text-white">
              <Link href={`experience`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer"/>
            </span>
          </div>
          <h2 className={` ${dynamicfontStyle}  font-semibold border-b pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>Experience</h2>
          <ul className={`${dynamicfontStyle} list-disc list-inside`}>
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
            <span className="bg-blue-500 text-white h-fit"><Grip className="p-1"/></span>
            <span className="bg-blue-500 text-white">
              <Link href={`/education`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer"/>
            </span>
          </div>
          <div className='flex justify-between w-full border-b'>
          <h2 className={`${dynamicfontStyle} font-semibold  pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>Education</h2>
          </div>
          <p className={`${dynamicfontStyle} mt-3`} style={{fontSize:`${dynamictextSize}px`}}>{Education?.degree}</p>
          <p className={`${dynamicfontStyle}`} style={{fontSize:`${dynamictextSize}px`}}>{Education?.schoolName} ({Education?.graduationDate})</p>
        </div>:""}
        {/* dynamic sections */}
        {
          dynamicSection?.map((data)=>{
            
            if (data?.id.toString() ==id) {
             console.log(
              "====",data);
            return(
              <>
<div className={` relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""}`} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
    <div className={`absolute  left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"} `}>
            <span className="bg-blue-500 text-white h-fit"><Grip className="p-1"/></span>
            <span className="bg-blue-500 text-white" >
              <Link href={`/dynamicsectionupdate/${data?.id}`}> <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/></Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer" onClick={()=>DeleteDynamicSection(data?.id?.toString())}/>
            </span>
          </div>
                <div className={`mb-4 ${dynamicfontStyle}`}>
                
          <div className='flex justify-between w-full border-b'>
          <h2 className={`${dynamicfontStyle} font-semibold  pb-1 mb-2`} style={{ fontSize: `${dynamicHeadingSize}px` }}>{data?.Name}</h2>
          </div>
        </div>
          {       data?.dynamicSections?.blocks?.map((maindata,i)=>{
              if (maindata?.type=="paragraph") {
                
                 return(
                  <>
                  <p className={`${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }} key={i}>
            {maindata?.data?.text}
          </p>
                  </>
                 )
              }
              if (maindata?.type=="header") {
                
                 return(
                  <>
                  <h2 className={`${dynamicfontStyle} font-semibold  pb-1 mb-2`} style={{ fontSize: `${dynamictextSize+1}px` }}>{maindata?.data?.text}</h2>
            
                  </>
                 )
              }
              if (maindata?.type=="list") {
                
                if (maindata?.data?.style=="ordered") {
                  return(
                    <>
                    <ol className="mt-1">
                      {maindata?.data?.items?.map((orderData:{content:string},i:number)=>{
                        // console.log(orderData)
                       return(
                        <>
                        <li id="i" className={`flex ml-1 ${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }}><span className="mr-1">{i+1}</span>{orderData?.content}</li>
                        </>
                       )
                      })}
                    </ol>
                    </>
                  )
                }
                if (maindata?.data?.style=="unordered") {
                  
                  return(
                    <>
                    <ul className="mt-1">
                      {maindata?.data?.items?.map((orderData:{content:string},i:number)=>{
                        // console.log(orderData)
                       return(
                        <>
                        <li id="i" className={`flex ${dynamicfontStyle}`} style={{ fontSize: `${dynamictextSize}px` }} key={i}><span className=""><Dot/></span>{orderData?.content}</li>
                        </>
                       )
                      })}
                    </ul>
                    </>
                  )
                }
              }
              })}
                </div></>
              )
           }
              
                
              
            
            
            
              
         
              
              
            
})
        }
        </div>
      
    </div>
  );
}
