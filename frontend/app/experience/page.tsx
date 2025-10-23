"use client"
import React, {  useState } from 'react'
import Experienceform from '@/components/Experienceform'
import { Button } from '@/components/ui/button'
import { ExperienceData } from '@/types/usestateTypes'


function PersnalInfoForm() {
  const [experience, setExperience] = useState<ExperienceData[]>([{
      employer: '',
      jobTitle: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      jobDescription: ''
    }])
    
    
    
    const AddExperienceBtn=()=>{
   
    setExperience((perv)=>[...perv,{
      employer: '',
      jobTitle: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      jobDescription: ''
    }])
    
    
    }
     
 

  return (
    <section className='p-8'>
        <div className="flex gap-x-2 items-center mb-1 justify-between">
          {/* <h3 className="text-[22px] text-[#0B1739]">EXPERIENCE</h3> */}
          <h3 className="font-bold text-[22px] text-[#1C74F8]">
            EXPERIENCE
          </h3>
          <Button className='bg-white border text-black hover:bg-gray-50 hover:text-black cursor-pointer' onClick={()=>AddExperienceBtn()}>Add Experience</Button>
        </div>
        <p className="text-[13px] text-gray-500">
List your work experience, from the most recent to the oldest. Feel free to use our pre-written examples.
        </p>
    
    <Experienceform  experience={experience} setExperience={setExperience}/>
    </section>
  )
}

export default PersnalInfoForm