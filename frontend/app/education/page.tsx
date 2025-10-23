"use client"
import React from 'react'
import EducationForm from '@/components/EducationForm'

function PersnalInfoForm() {
  

  return (
    <section className='p-8'>
        <div className="flex gap-x-2 items-center mb-1">
          {/* <h3 className="text-[22px] text-[#0B1739]">EXPERIENCE</h3> */}
          <h3 className="font-bold text-[22px] text-[#1C74F8]">
            Education
          </h3>
        </div>
        <p className="text-[13px] text-gray-500">Add information about your educational background.</p>
    
    <EducationForm/>
    </section>
  )
}

export default PersnalInfoForm