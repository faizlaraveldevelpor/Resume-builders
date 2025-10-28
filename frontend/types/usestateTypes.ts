import React from "react"
import type{ OutputData} from '@editorjs/editorjs'
export interface PersonalInfo {
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  zip: string
  email: string
  phone: string
  Profession:string
  
}
export interface ExperienceData {
  employer: string
  jobTitle: string
  city: string
  state: string
  startDate: string
  endDate: string
  jobDescription: string
}
export interface EducationInfo {
  schoolName: string;
  city: string;
  state: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
}
export interface ExperienceFormType{
   Employer :React.JSX.Element,
     jobTitle:React.JSX.Element
     City:React.JSX.Element
     State:React.JSX.Element
     Start_date:React.JSX.Element
     End_date:React.JSX.Element
     Job_description:React.JSX.Element
}
export interface DynamicSectionsType{
  Name: string;
  dynamicSections?: OutputData; 
  id:number         
}