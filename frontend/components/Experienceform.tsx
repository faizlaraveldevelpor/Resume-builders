"use client"
import React, { useEffect, useState } from 'react'
import ResumeNavigater2 from '../public/Resume navigator 2.png'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ExperienceData } from '@/types/usestateTypes'
import { Loader2, Trash } from 'lucide-react'

type EducationFormProps = {
  setExperience: React.Dispatch<React.SetStateAction<ExperienceData[]>>;
  experience:ExperienceData[]
};
function Experienceform({experience,setExperience}:EducationFormProps) {
    const router=useRouter()
  const [loading,setloading]=useState(false)
  

  // // universal handler
  const handleChange = (Name:string, value: string,I:number) => {
  setExperience((perv)=>perv.map((data,i)=>i==I?{...data,[Name]:value}:data))
  
  
  
  }

  const SaveInLocalHost = () => {
    setTimeout(() => {
      if (experience) {
      localStorage.setItem("experiance", JSON.stringify(experience));
        
      }
    router.push('/education')
      setloading(true)
    }, 100);
    };
    useEffect(() => {
      const LocalstorageData = localStorage.getItem("experiance");
     if (LocalstorageData!=="undefined") {
      if (Array.isArray(LocalstorageData)) {
      setExperience(JSON.parse(LocalstorageData || ""));
        
      }else{
        setExperience(([JSON.parse(LocalstorageData ||'')]))
      }
        
     }
      
    }, []);
    const DeletExperience=(I:number)=>{

         setExperience((perv)=>perv.filter((data,i)=>i!==I))
        
     
        
        }
         
    
  return (
 <div className='w-full flex md:flex-row flex-col gap-x-12 mt-10'>
      <div className='md:w-[70%] w-full'>
        {
          experience?.map((data,i)=>{
          return(
            <>
            <div key={i}>
              {/* Employer + Job title */}
        <div className='md:flex gap-x-5'>
          <span className='md:w-[50%] w-full'>
            <p className='mb-1 text-[14px]'>Employer</p>
            <Input type='text'   value={data.employer}
              onChange={(e) => handleChange('employer', e.target.value,i)} placeholder='Add your Company'/>
          </span>
          <span className='md:w-[50%] w-full'>
            <p className='mb-1 text-[14px] mt-4 md:mt-0'>Job title</p>
            <Input
              placeholder='Job title'
              type='text'
              value={data.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value,i)}
            />
          </span>
        </div>

        {/* City */}
        <span className='w-[100%] mt-5'>
          <p className='mb-1 text-[14px]'>City</p>
          <Input
            placeholder='City'
            type='text'
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value,i)}
          />
        </span>

        {/* State + Start Date + End Date */}
        <div className='md:flex gap-x-5 mt-5 mb-4'>
          <span className='md:w-[50%] w-full'>
            <p className='mb-1 text-[14px]'>State</p>
            <Input
              placeholder='State'
              type='text'
              value={data.state}
              onChange={(e) => handleChange('state', e.target.value,i)}
            />
          </span>
          <span className='w-[20%]'>
            <p className='mb-1 text-[14px] mt-5 md:mt-0'>Start date</p>
            <Input
              type='month'
              value={data.startDate}
              onChange={(e) => handleChange('startDate', e.target.value,i)}
            />
          </span>
          <span className='w-[20%]'>
            <p className='mb-1 text-[14px] mt-5 md:mt-0'>End date</p>
            <Input
              type='month'
              value={data.endDate}
              onChange={(e) => handleChange('endDate', e.target.value,i)}
            />
          </span>
        </div>

        {/* Job Description */}
        <span className='w-[100%] mt-5'>
          <p className='mb-1 text-[14px]'>Job description</p>
          <Input
            placeholder='Job description'
            type='text'
            value={data.jobDescription}
            onChange={(e) => handleChange('jobDescription', e.target.value,i)}
          />
        </span>
        <div>
               <div className='md:min-w-full  relative bg-black h-[2px] my-7 border-dotted border-blue-950'>
               <span className='absolute -top-4  bg-blue-600 text-white rounded-full h-[30px] w-[30px] flex justify-center items-center'><h3>{i+1}</h3></span>
               <span className='absolute -top-4  bg-red-500 cursor-pointer hover:scale-[1.1] text-white text-[11px] rounded-full h-[30px] left-[99%] w-[30px] flex justify-center items-center' onClick={()=>DeletExperience(i)}><Trash className='size-5'/></span>
            </div>
            </div> 
            </div>
            
            </>
          )
          })
        }
        

        {/* Buttons */}
        <div className='flex justify-between gap-x-16 w-full px-10 mt-10'>
          <Button
            className='bg-white hover:bg-gray-50 text-black border cursor-pointer w-[100px] h-[40px]'
            onClick={() => router.back()}
          >
            Back
          </Button>
          
            <Button className='bg-[#1C74F8] hover:bg-[#0d62e1] cursor-pointer w-[100px] h-[40px]' onClick={()=>SaveInLocalHost()} disabled={loading}>
              {loading==true?<Loader2 className='animate-spin'/>:""}
              
              Next               
            </Button>
          
        </div>
      </div>

      {/* Image */}
      <div>
        <Image src={ResumeNavigater2} alt='img' />
      </div>
    </div>
    
)
}

export default Experienceform