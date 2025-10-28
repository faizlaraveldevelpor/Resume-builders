"use client"
import HearoSection from "@/components/HearoSection";
import HowWorks from "@/components/HowWorks";
import HomeSlider from "@/components/slider/HomeSlider";
// import { useSummaryCreateMutation } from "@/lib/Gemini";
// import { useEffect } from "react";
export default function Home() {
  return (
   
    <>
    <section>
      <HearoSection/>
    </section>
    <section className=" 2xl:flex 2xl:justify-center">
      <HowWorks/>
    </section>
    <section id="sliderbg" >
    
        <HomeSlider/>
      
    </section>
    </>
  );
}
