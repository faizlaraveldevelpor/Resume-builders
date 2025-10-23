import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { degrees } from "@/constants/DegreeNames"
import { EducationInfo } from "@/types/usestateTypes";
type EducationFormProps = {
  setFormData: React.Dispatch<React.SetStateAction<EducationInfo>>;
  formData:string
};
export function SelectDegree({setFormData,formData}:EducationFormProps) {
  
  
  return (
    <Select value={formData} onValueChange={(value)=>setFormData((perv:EducationInfo)=>({...perv,degree:value}))}>
      <SelectTrigger className="w-[280px]">
        <SelectValue   placeholder="Select Degree" />
      </SelectTrigger>
      <SelectContent>
        {degrees?.map((data:string,i)=>{
          return(
            <>
            <div key={i}>
            <SelectItem value={data} >{data}</SelectItem>
            
            </div>
            
            </>
          )
        })}
      </SelectContent>
    </Select>
  )
}
