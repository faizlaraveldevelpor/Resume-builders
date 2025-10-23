"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import EditorJS, { BlockToolConstructable, OutputData } from "@editorjs/editorjs"
import peragraph from '@editorjs/paragraph'
import Header from "@editorjs/header"
import List from "@editorjs/list"
import { Input } from "./ui/input"
import type{ DynamicSectionsType } from "@/types/usestateTypes"

export function UpdateDynamicsection() {
  const editorRef = useRef<EditorJS | null>(null)
  const [open, setOpen] = useState(false)
  const [dynamicSectionsLocalHostPush,setdynamicSectionsLocalHostPush]=useState<DynamicSectionsType[]>([])
  const [dynamicSections,setdynamicSections]=useState<OutputData>()
  const [dynamicSectionNmae,setdynamicSectionNmae]=useState<string>()


  useEffect(() => {
    if (open && !editorRef.current) {
      const editor =editorRef.current= new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: {
            class: peragraph as unknown as  BlockToolConstructable,
            inlineToolbar: true, // 👈 Enables bold, italic, link, etc.
          },
          list:List
        },
        onChange:async()=>{
        setdynamicSections(await editor.save())
        
        },
        autofocus: true,
        
        placeholder: "Write something amazing...",
      })
    //   editorRef.current = editor
      
    }

    // return () => {
    //   if (editorRef.current) {
    //     editorRef.current.destroy()
    //     editorRef.current = null
    //   }
    // }
  }, [open])
  const saveEditorDataBtn=async()=>{
    const rendomNumber=Math.floor(Math.random()*1000)
   setdynamicSectionsLocalHostPush((perv)=>([...perv,{Name:dynamicSectionNmae??"",dynamicSections,id:rendomNumber}]))
   
  
  }

useEffect(()=>{

    if (dynamicSections) {
         localStorage.setItem("dynamicsections",JSON.stringify(dynamicSectionsLocalHostPush))
    }
   

},[dynamicSectionsLocalHostPush])
useEffect(()=>{
    const dynamicSectionGet=localStorage.getItem("dynamicsections")
    if (dynamicSectionGet) {

    setdynamicSectionsLocalHostPush(JSON.parse(dynamicSectionGet))
        
    }
},[])
  return (
    <Dialog open={open}  >
      <DialogTrigger asChild>
          <Pencil className="p-1 hover:scale-[1.2] cursor-pointer"/>
        
      </DialogTrigger>

      <DialogContent className=" w-full  max-w-none bg-white  ">
        <DialogHeader>
          <DialogTitle>Add Fields</DialogTitle>
        </DialogHeader>

        <DialogDescription className="">
            <div className="mb-3 ">
                <h3 className="text-black mb-1">Section Name</h3>
                <Input placeholder="Enter your section name" onChange={(e)=>setdynamicSectionNmae(e.target.value)}/>
            </div>
          <div className="max-h-[400px]">
            <div
            id="editorjs"
            className="border rounded-lg  h-[400px] bg-gray-50 p-4 overflow-y-scroll "
          ></div>
          </div>
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer z-50" onClick={()=>saveEditorDataBtn()}>Save Chnages</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
