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

export function SelectSkills() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Degree" />
      </SelectTrigger>
      <SelectContent>
        
          {/* <SelectLabel>North America</SelectLabel> */}
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
    
       
      </SelectContent>
    </Select>
  )
}
