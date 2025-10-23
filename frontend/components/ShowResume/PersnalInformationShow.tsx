import React from 'react'

function PersnalInformationShow() {
  return (
   <div className="mb-4">
          <h2 className={` font-semibold border-b pb-1 mb-2 text-[${dynamicHeadingSize}px]`}>Summary</h2>
          <p>
            {Summary}
          </p>
        </div>
  )
}

export default PersnalInformationShow