import { File, Notebook, Pen } from "lucide-react";
import React from "react";

function HowWorks() {
  return (
    <div className="bg-gradient-to-b from-[#F9FBFF] to-[#F2F6FC] px-5 mt-10 flex lg:justify-center lg:flex-row flex-col items-center gap-12 md:items-center py-20 flex-wrap 2xl:w-[1200px] rounded-2xl shadow-sm">
      
      {/* Step 1 */}
      <div className="lg:w-[30%] flex flex-col items-center text-center group">
        <div className="min-w-[70px] min-h-[70px] rounded-full bg-[#0061F2] flex justify-center items-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
          <Notebook className="text-white w-8 h-8" />
        </div>
        <h3 className="font-semibold text-[20px] text-[#0B1739] group-hover:text-[#0061F2] transition-colors">
          CHOOSE YOUR RESUME TEMPLATE
        </h3>
        <p className="mt-4 text-center text-[#4B4B4B] leading-relaxed">
          Our professional resume templates are designed strictly following all
          industry guidelines and best practices that employers look for.
        </p>
      </div>

      {/* Step 2 */}
      <div className="lg:w-[30%] flex flex-col items-center text-center group">
        <div className="min-w-[70px] min-h-[70px] rounded-full bg-[#0061F2] flex justify-center items-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
          <Pen className="text-white w-8 h-8" />
        </div>
        <h3 className="font-semibold text-[20px] text-[#0B1739] group-hover:text-[#0061F2] transition-colors">
          SHOW WHAT YOU ARE MADE OF
        </h3>
        <p className="mt-4 text-center text-[#4B4B4B] leading-relaxed">
          Not finding the right words to showcase yourself? We’ve added
          thousands of pre-written examples and resume samples — as easy as
          clicking.
        </p>
      </div>

      {/* Step 3 */}
      <div className="lg:w-[30%] flex flex-col items-center text-center group">
        <div className="min-w-[70px] min-h-[70px] rounded-full bg-[#0061F2] flex justify-center items-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
          <File className="text-white w-8 h-8" />
        </div>
        <h3 className="font-semibold text-[20px] text-[#0B1739] group-hover:text-[#0061F2] transition-colors">
          DOWNLOAD YOUR RESUME
        </h3>
        <p className="mt-4 text-center text-[#4B4B4B] leading-relaxed">
          Start impressing employers — download your awesome resume and land the
          job you’re looking for effortlessly.
        </p>
      </div>
    </div>
  );
}

export default HowWorks;
