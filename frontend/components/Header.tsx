import React from "react";
import { Button } from "./ui/button";
import { HeaderSidebar } from "./sidebar/HeaderSidebar";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

function Header() {
  return (
    <header className="w-full lg:flex lg:justify-center border-b border-gray-200 bg-gradient-to-r from-white to-[#f8faff] shadow-sm sticky top-0 z-50">
      <div className="w-[100%] 2xl:w-[1200px]">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <h3 className="text-2xl font-extrabold text-[#0B1739] tracking-tight hover:text-[#0061F2] transition-colors">
                Resume<span className="text-[#0061F2]">Pro</span>
              </h3>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-x-8">
              {/* <span className="text-[#333] font-medium hover:text-[#0061F2] cursor-pointer transition-colors">
                Home
              </span> */}
              {/* <span className="text-[#333] font-medium hover:text-[#0061F2] cursor-pointer transition-colors">
                Cover Letter
              </span> */}
              {/* <Link href={'/login'}>
              <Button className="bg-white border border-gray-300 text-[#0B1739] hover:bg-gray-50 shadow-sm cursor-pointer transition-all hover:scale-105">
                Login
              </Button>
              </Link> */}
              <Link href={`/choesoptions`}>
              
              <Button className="bg-[#0061F2] hover:bg-[#004bd4] text-white cursor-pointer shadow-sm transition-all hover:scale-105">
                Build Resume
              </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="block md:hidden">
            <SidebarTrigger />
            <HeaderSidebar />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
