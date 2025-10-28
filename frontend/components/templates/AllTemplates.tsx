import React from 'react'
import Template1 from './template1/Template1'
import Template2 from './template2/Template2'
import Template3 from './template3/Template3'

type all={
    dynamicName:number,
    dynamicHeadingSize:number,
    dynamictextSize:number,
    dynamicfontStyle:string,
    resumechose:number
}
function AllTemplates({dynamicName,dynamicHeadingSize,dynamictextSize,dynamicfontStyle,resumechose}:all) {
  switch (resumechose) {
    case 1:
      return(
        <>
        <Template1 dynamicName={dynamicName} dynamicHeadingSize={dynamicHeadingSize} dynamictextSize={dynamictextSize} dynamicfontStyle={dynamicfontStyle}/>
        </>
      )
      
      case 2:
        return(
          <>
          <Template2 dynamicName={dynamicName} dynamicHeadingSize={dynamicHeadingSize} dynamictextSize={dynamictextSize} dynamicfontStyle={dynamicfontStyle} />
          </>
        )
      case 3:
        return(
          <>
          <Template3 dynamicName={dynamicName} dynamicHeadingSize={dynamicHeadingSize} dynamictextSize={dynamictextSize} dynamicfontStyle={dynamicfontStyle} />
          </>
        )
      
    default:
      break;
  }
  
}

export default AllTemplates