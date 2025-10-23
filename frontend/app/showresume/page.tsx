"use client"
import { DynamicSectionsType, EducationInfo, ExperienceData,  PersonalInfo } from '@/types/usestateTypes'
import React, { useEffect, useState } from 'react'
import Resume1 from '../../public/resume1.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Grip, Pencil, Plus, Trash } from 'lucide-react'
import { DndContext, closestCenter, type DragEndEvent  } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableBox } from "../../components/Drageable";
import { Slider } from "@/components/ui/slider"
import { FontstyleChange } from '@/components/FontstyleChange'
import { Dynamicsections } from '@/components/dynamicsections'
import Link from 'next/link'
function Showresume() {
    const [PersnalInformation,setPersnalInformation]=useState<PersonalInfo>()
    const [Summary,setSummary]=useState<string>()
    const [Skills,setSkills]=useState<string[]>()
    const [Experience,setExperience]=useState<ExperienceData[]>()
    const [Education,setEducation]=useState<EducationInfo>()
    useEffect(()=>{
        // persnal information
        const GetPersnalInformation=localStorage.getItem("persnalInformation")
        if (GetPersnalInformation) {
            const Stringify=JSON.parse(GetPersnalInformation)
            setPersnalInformation(Stringify)
        }
        // summary
        const GetSummary=localStorage.getItem("summary")
        if (GetSummary) {
            const Stringify=JSON.parse(GetSummary)
            setSummary(Stringify)
        }
        // skills
        const GetSkills=localStorage.getItem("skills")
        if (GetSkills) {
            const Stringify=JSON.parse(GetSkills)
            setSkills(Stringify)
        }
        // experience
        const GetExperience=localStorage.getItem("experiance")
        if (GetExperience) {
            const Stringify=JSON.parse(GetExperience)
            setExperience(Stringify)
            console.log(Stringify);
            
        }
        // education
        const GetEducation=localStorage.getItem("education")
        if (GetEducation) {
            const Stringify=JSON.parse(GetEducation)
            setEducation(Stringify)

            
        }
    },[])
        
    // dynamic styles
     const [dynamicName,setdynamicName]=useState<number>(30)
     const [dynamicHeadingSize,setdynamicHeadingSize]=useState<number>(20)
     const [dynamictextSize,setdynamictextSize]=useState<number>(14)
     const [dynamicfontStyle,setdynamicfontStyle]=useState<string>("")
     const [dynamicSection,setdynamicSection]=useState<DynamicSectionsType[]>()
     
    
 
const [Drag,setDrag]=useState([
  {
    id:"persnalInformation",
      },
  {
    id:"skills",
    
  },
  {
    id:"experience",
     },
  {
    id:"education",
      }
])
    const [hoverSections,sethoverSections]=useState(false)
const handleDragEnd = ({ active, over }:DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setDrag((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id);
      const newIndex = prev.findIndex((b) => b.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };
    useEffect(()=>{
  const dynamicsectionlocalHost=localStorage.getItem("dynamicsections")
  if (dynamicsectionlocalHost) {
    
    setdynamicSection(JSON.parse(dynamicsectionlocalHost))
  }
  
  },[])
  useEffect(()=>{
     if (dynamicSection) {
  dynamicSection.map((data)=>setDrag((perv)=>([...perv,{id:data?.id.toString()}])))
  }
  },[dynamicSection])
 
  

  return (
 <div className='w-full flex md:flex-row flex-col items-center md:items-start '>
  <div className="p-6 md:w-[70%] w-[100%] ">
      <div
        
        className="max-w-3xl mx-auto bg-white text-black p-8 shadow-lg border overflow-y-scroll h-full"
      >
        {/* Header */}
        <div className={`text-center mb-6 relative ${hoverSections==true?"border-2 border-blue-500 pl-2":""} `} onMouseEnter={()=>sethoverSections(true)} onMouseLeave={()=>sethoverSections(false)}>
             <div className={`absolute left-0 z-40 flex justify-between w-full ${hoverSections==true?"block":"hidden"}`}>
            <span className="bg-blue-500 text-white h-fit"><Grip className="p-1"/></span>
            <span className="bg-blue-500 text-white">
              <Link href={`/persnalinfo`}>
              <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
              </Link>
              <Trash className="p-1 hover:scale-[1.2] cursor-pointer"/>
            </span>
          </div>
          <span className='flex justify-center mb-1 gap-x-2'>
            <h1 className={`  font-bold ${dynamicfontStyle}`} style={{fontSize:`${dynamicName}px`}}>{PersnalInformation?.firstName}</h1>
            <h1 className={` font-bold ${dynamicfontStyle}`} style={{fontSize:`${dynamicName}px`}}>{PersnalInformation?.lastName}</h1>

          </span>
          <p className={`text-gray-600 inter text-[${dynamictextSize}px] ${dynamicfontStyle}`} style={{fontSize:`${dynamictextSize}px`}}>{PersnalInformation?.Profession}</p>
          <p className={`text-gray-500 text-[${dynamictextSize}px] ${dynamicfontStyle}`} style={{fontSize:`${dynamictextSize}px`}}>{PersnalInformation?.email} | {PersnalInformation?.phone} | {PersnalInformation?.city}, {PersnalInformation?.country}</p>
        </div>
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={Drag.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4 h-screen">
            {Drag.map((Drag) => (
              <SortableBox key={Drag.id} id={Drag.id} dynamicHeadingSize={dynamicHeadingSize} Summary={Summary} Skills={Skills} dynamictextSize={dynamictextSize} Experience={Experience} Education={Education} dynamicfontStyle={dynamicfontStyle} dynamicSection={dynamicSection}/>
            ))}
          </div>
        </SortableContext>
      </DndContext>
        

        
      </div>

      {/* Generate PDF Button */}
       <div className="text-center mt-6">
        <button
          
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate PDF
        </button>
      </div> 
    </div>
  <div className='md:w-[30%] p-6 md:p-0 my-6  mr-3'>
    <div className='h-[500px] border'>
      <div className='bg-blue-500 w-full flex pl-3 py-1 font-bold text-[20px] '><h3 className='text-white'>Resume Designs</h3></div>
      <div className='p-2 '>
        <div className='w-[50%] border cursor-pointer hover:border hover:border-blue-500'>
          <Image src={Resume1} alt='img'/>
        </div>
      </div>
    </div>
    <div className='w-full pt-3 flex flex-col gap-y-5'>
      
      <FontstyleChange setdynamicfontStyle={setdynamicfontStyle} dynamicfontStyle={dynamicfontStyle}/>
       <span>
        <h3 className='mb-3'>Name Size</h3>
<Slider   step={1} defaultValue={[30]}  onValueChange={(e)=>setdynamicName(e[0])}/>
      </span>
      <span>
        <h3 className='mb-3'>Heading Size</h3>
<Slider   step={1} defaultValue={[20]}  onValueChange={(e)=>setdynamicHeadingSize(e[0])}/>
      </span>
      <span>
        <h3 className='mb-3'>text Size</h3>
<Slider defaultValue={[14]} max={100} step={1}  onValueChange={(e)=>setdynamictextSize(e[0])}/>
      </span>
      <Link href={`/summary`}><Button className={`w-full  bg-white text-blue-500 font-semibold hover:text-blue-800 border border-blue-500 hover:bg-white hover:border hover:border-blue-800 cursor-pointer`}><Plus/>Update Summary</Button></Link>
      <Link href={`/education`}><Button className={`w-full  bg-white text-blue-500 font-semibold hover:text-blue-800 border border-blue-500 hover:bg-white hover:border hover:border-blue-800 cursor-pointer`}><Plus/>Update Education</Button></Link>
      <Link href={`/experience`}>
      <Button className={`w-full  bg-white text-blue-500 font-semibold hover:text-blue-800 border border-blue-500 hover:bg-white hover:border hover:border-blue-800 cursor-pointer`}><Plus/>Update Experience</Button>
      </Link>
      <Link href={`/skills`}>
      <Button className={`w-full  bg-white text-blue-500 font-semibold hover:text-blue-800 border border-blue-500 hover:bg-white hover:border hover:border-blue-800 cursor-pointer`}><Plus/>Update skills</Button>
      </Link>
      {/* <UpdateDynamicsection/> */}
      <Link href={`/dynamicsection`}>
      <Button className={`w-full  bg-white text-blue-500 font-semibold hover:text-blue-800 border border-blue-500 hover:bg-white hover:border hover:border-blue-800 cursor-pointer`}><Plus/>Create Dynamic sections</Button>
      
      </Link>
      {/* <Dynamicsections/> */}
    </div>

  </div>
 </div>
)
}

export default Showresume