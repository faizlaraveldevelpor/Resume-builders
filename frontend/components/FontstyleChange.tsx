import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label"
import { spawn } from "child_process"
type setdynamicfont={
   setdynamicfontStyle :React.Dispatch<React.SetStateAction<string>>,
   dynamicfontStyle:string
}
export function FontstyleChange({setdynamicfontStyle,dynamicfontStyle}:setdynamicfont) {
  return (
    
    <Select value={dynamicfontStyle} onValueChange={(font)=>setdynamicfontStyle(font)}>
      <Label className="mt-2">Font styles</Label>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a font style" />
      </SelectTrigger>
      
      <SelectContent >
        
        <SelectGroup>
          <SelectLabel>Fonts</SelectLabel>
          <SelectItem value="roboto" >roboto</SelectItem>
          <SelectItem value="open-sans" >open-sans</SelectItem>
          <SelectItem value="bbh-sans-bogle-regular" >bbh-sans-bogle-regular</SelectItem>
          <SelectItem value="inter" >inter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
