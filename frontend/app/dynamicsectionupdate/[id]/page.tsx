"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable, OutputData } from "@editorjs/editorjs";
import paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import type { DynamicSectionsType } from "@/types/usestateTypes";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function Page() {
  const { id } = useParams();

  const router=useRouter()
  
  const editorRef = useRef<EditorJS | null>(null);
  const [dynamicSectionsLocalHostPush, setDynamicSectionsLocalHostPush] = useState<DynamicSectionsType[]>([]);
  const [dynamicSections, setDynamicSections] = useState<OutputData>();
  const [dynamicSectionName, setDynamicSectionName] = useState<string>();

  const filterSection = dynamicSectionsLocalHostPush?.filter(
    (data) => data?.id.toString() === id?.toString()
  );

  // 🔹 Load localStorage data first
  useEffect(() => {
    const dynamicSectionGet = localStorage.getItem("dynamicsections");
    if (dynamicSectionGet) {
      setDynamicSectionsLocalHostPush(JSON.parse(dynamicSectionGet));
    }

  }, []);
  

  // 🔹 Initialize Editor only when data exists
  useEffect(() => {
    if (filterSection.length > 0 && filterSection[0]?.dynamicSections && !editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: {
            class: paragraph as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          list: List,
        },
        data: filterSection[0]?.dynamicSections, // ✅ load existing content
        onChange: async () => {
          const data = await editor.save();
          setDynamicSections(data);
        },
        autofocus: true,
        placeholder: "Write something amazing...",
      });

      editorRef.current = editor;
    }
    
    // setDynamicSectionName(filterSection[0]?.Name)

    // return () => {
    //   if (editorRef.current) {
    //     editorRef.current.destroy();
    //     editorRef.current = null;
    //   }
      
    // };
  }, [filterSection]);

  // 🔹 Save updated data
  const saveEditorDataBtn = async () => {
  
    const filterUpdatedData=dynamicSectionsLocalHostPush.filter((data)=>data?.id?.toString()!==id?.toString())
    setDynamicSectionsLocalHostPush(filterUpdatedData)
   setDynamicSectionsLocalHostPush((prev) => [
      ...prev,
      { Name: dynamicSectionName ?? "", dynamicSections, id:Number(id)  },
    ]);
    
    
   
  };

 useEffect(()=>{localStorage.setItem("dynamicsections", JSON.stringify(dynamicSectionsLocalHostPush));
    toast("save successfully")},[dynamicSectionsLocalHostPush])

  return (
    <div className="flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-6 space-y-4">
      {/* Section Name Input */}
      <div className="w-full max-w-3xl">
        <h3 className="text-black mb-2 text-lg sm:text-xl font-semibold">
          Section Name
        </h3>
        <Input
          placeholder="Enter your section name"
          value={dynamicSectionName}
          onChange={(e) => setDynamicSectionName(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Editor Container */}
      <div className="w-full max-w-3xl bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div
          id="editorjs"
          className="h-[300px] sm:h-[350px] md:h-[400px] p-4 overflow-y-auto rounded-md focus:outline-none"
        ></div>
      </div>
<div className="flex gap-x-5">
<button
        onClick={()=>{  router.back() }}
        className="mt-4 px-6 py-2 cursor-pointer bg-white hover:bg-white text-black border font-medium rounded-md transition"
      >
        Back
      </button>
      <button
        onClick={()=>{saveEditorDataBtn() }}
        className="mt-4 px-6 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
      >
        Update Section
      </button>
</div>
      
    </div>
  );
}

export default Page;
