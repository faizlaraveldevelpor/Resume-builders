import { BuildingIcon, Calendar, Home, Inbox, LetterText, LogIn, LogInIcon, LogOut, LogOutIcon, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Cover Letters",
    url: "#",
    icon: LetterText,
  },
  
    {
    title: "Build Resume",
    url: "#",
    icon: BuildingIcon,
  },
  {
    title: "Login",
    url: "#",
    icon: LogInIcon,
  },
//   {
//     title: "logout",
//     url: "#",
//     icon: LogOutIcon,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
]

export function HeaderSidebar() {
  return (
    <Sidebar className="" side="right" >
            
                
            

      <SidebarContent >
        
        <SidebarGroup>

          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}