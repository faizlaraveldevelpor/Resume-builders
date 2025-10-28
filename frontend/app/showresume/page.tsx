"use client"
import React, {  useState } from 'react'
import Resume1 from '../../public/resume1.1.png'
import Resume2 from '../../public/resume2.2.png'
import Resume3 from '../../public/resume3.3.png'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {  Plus,  } from 'lucide-react'

import { Slider } from "@/components/ui/slider"
import { FontstyleChange } from '@/components/FontstyleChange'
import Link from 'next/link'
import AllTemplates from '@/components/templates/AllTemplates'

function Showresume() {
const ResmeImage=[Resume1,Resume2,Resume3]
  const [dynamicName,setdynamicName]=useState<number>(30)
  const [dynamicHeadingSize,setdynamicHeadingSize]=useState<number>(20)
  const [dynamictextSize,setdynamictextSize]=useState<number>(14)
  const [dynamicfontStyle,setdynamicfontStyle]=useState<string>("")
  const [resumechose,setresumechose]=useState<number>(1)


 

  

  return (
    
      
        
   <div className='min-h-screen'>
<div className='w-full flex md:flex-row flex-col items-center md:items-start h-full'>

      <div className="p-6 md:w-[70%] w-[100%] h-full"   >
        <AllTemplates dynamicName={dynamicName}
dynamicHeadingSize={dynamicHeadingSize}
dynamictextSize={dynamictextSize}
 dynamicfontStyle={dynamicfontStyle}
resumechose={resumechose}
/>

        {/* Generate PDF Button */}
        {/* <div className="text-center mt-6">
          
          <Button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700" >
            Generate PDF
          </Button>
          
        </div> */}
      </div>

      <div className='md:w-[30%] p-6 md:p-0 my-6 mr-3'>
        <div className='h-[500px] overflow-y-scroll border'>
          <div className='bg-blue-500 w-full flex   pl-3 py-1 font-bold text-[20px]'><h3 className='text-white'>Resume Designs</h3></div>
          <div className='p-2'>
            <div className='w-[100%]  flex-wrap gap-y-3  flex gap-x-2'>
              {
                ResmeImage?.map((data,i)=>{
                  return(
                    <>
              <Image src={data} alt='img' className='hover:border-2 w-fit border  hover:border-blue-400' onClick={()=>setresumechose(i+1)}/>
                    
                    </>
                  )
                })
              }
            </div>
          </div>
        </div>
        

        <div className='w-full pt-3 flex flex-col gap-y-5'>
          <FontstyleChange setdynamicfontStyle={setdynamicfontStyle} dynamicfontStyle={dynamicfontStyle}/>
          <span>
            <h3 className='mb-3'>Name Size</h3>
            <Slider step={1} defaultValue={[30]} onValueChange={(e)=>setdynamicName(e[0])}/>
          </span>
          <span>
            <h3 className='mb-3'>Heading Size</h3>
            <Slider step={1} defaultValue={[20]} onValueChange={(e)=>setdynamicHeadingSize(e[0])}/>
          </span>
          <span>
            <h3 className='mb-3'>Text Size</h3>
            <Slider step={1} defaultValue={[14]} max={100} onValueChange={(e)=>setdynamictextSize(e[0])}/>
          </span>

          <Link href={`/summary`}><Button className="w-full bg-white text-blue-500 font-semibold border border-blue-500 hover:bg-white hover:border-blue-800"><Plus/> Update Summary</Button></Link>
          <Link href={`/education`}><Button className="w-full bg-white text-blue-500 font-semibold border border-blue-500 hover:bg-white hover:border-blue-800"><Plus/> Update Education</Button></Link>
          <Link href={`/experience`}><Button className="w-full bg-white text-blue-500 font-semibold border border-blue-500 hover:bg-white hover:border-blue-800"><Plus/> Update Experience</Button></Link>
          <Link href={`/skills`}><Button className="w-full bg-white text-blue-500 font-semibold border border-blue-500 hover:bg-white hover:border-blue-800"><Plus/> Update Skills</Button></Link>
          <Link href={`/dynamicsection`}><Button className="w-full bg-white text-blue-500 font-semibold border border-blue-500 hover:bg-white hover:border-blue-800"><Plus/> Create Dynamic Sections</Button></Link>
        </div>
      </div>
    </div>
   </div>
    
    
    
  
    
     
  )
}

export default Showresume
