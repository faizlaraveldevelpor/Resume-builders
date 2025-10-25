import React from 'react'
import Template1 from './Template1'
import Resume2 from './Template2'
import Resume3 from './Template3'
import Resume4 from './Template4'
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
      break;
      case 2:
        return(
          <>
          <Resume2 dynamicName={dynamicName} dynamicHeadingSize={dynamicHeadingSize} dynamictextSize={dynamictextSize} dynamicfontStyle={dynamicfontStyle} />
          </>
        )
      case 3:
        return(
          <>
          
          <Resume3 dynamicName={dynamicName} dynamicHeadingSize={dynamicHeadingSize} dynamictextSize={dynamictextSize} dynamicfontStyle={dynamicfontStyle} />
          </>
        )
    default:
      break;
  }
  return (
    <div>
        <Resume4 dynamicName={dynamicName} dynamicHeadingSize={dynamicHeadingSize} dynamictextSize={dynamictextSize} dynamicfontStyle={dynamicfontStyle} />
    </div>
  )
}

export default AllTemplates