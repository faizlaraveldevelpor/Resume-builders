"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable, OutputData } from "@editorjs/editorjs";
import paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import type { DynamicSectionsType } from "@/types/usestateTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Page() {
  const editorRef = useRef<EditorJS | null>(null);
  const [open, setOpen] = useState(false);
  const [dynamicSectionsLocalHostPush, setDynamicSectionsLocalHostPush] = useState<DynamicSectionsType[]>([]);
  const [dynamicSections, setDynamicSections] = useState<OutputData>();
  const [dynamicSectionName, setDynamicSectionName] = useState<string>();

  useEffect(() => {
    if ( !editorRef.current) {
      const editor = (editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: {
            class: paragraph as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          list: List,
        },
        onChange: async () => {
          setDynamicSections(await editor.save());
        },
        autofocus: true,
        placeholder: "Write something amazing...",
      }));
    }
  }, [open]);

  const saveEditorDataBtn = async () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setDynamicSectionsLocalHostPush((prev) => [
      ...prev,
      { Name: dynamicSectionName ?? "", dynamicSections, id: randomNumber },
    ]);
  };

  useEffect(() => {
    if (dynamicSections) {
      localStorage.setItem("dynamicsections", JSON.stringify(dynamicSectionsLocalHostPush));
    }
  }, [dynamicSectionsLocalHostPush]);

  useEffect(() => {
    const dynamicSectionGet = localStorage.getItem("dynamicsections");
    if (dynamicSectionGet) {
      setDynamicSectionsLocalHostPush(JSON.parse(dynamicSectionGet));
    }
  }, []);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Section Name Input */}
      <div className="mb-4">
        <h3 className="text-black mb-2 text-base sm:text-lg md:text-xl font-medium">
          Section Name
        </h3>
        <Input
          placeholder="Enter your section name"
          onChange={(e) => setDynamicSectionName(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Editor Container */}
      <div className="w-full border rounded-lg bg-gray-50 p-3 sm:p-4 md:p-6">
        <div
          id="editorjs"
          className="border rounded-lg bg-white h-[250px] sm:h-[350px] md:h-[400px] overflow-y-auto p-3 sm:p-4"
        ></div>
<div className="flex justify-center mt-4">
            <Button variant="outline" className="cursor-pointer z-50" onClick={()=>saveEditorDataBtn()}>Save Chnages</Button>

</div>
      </div>
    </div>
  );
}

export default Page;
