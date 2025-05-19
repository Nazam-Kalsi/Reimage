import React from 'react'
import { Outlet } from "react-router";
import { SidebarFooter, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { BadgeIcon, ImageIcon, VideotapeIcon } from 'lucide-react';

type Props = {}

function DashboardContainer({}: Props) {

  const sideBarItems = [
    {
      title: "View All",
      url: "/dashboard",
      icon: () => <BadgeIcon/>,
    },
    {
      title: "Upload Image",
      url: "/dashboard/upload-image",
      icon: () => <ImageIcon/>,
    },
    {
      title: "Upload Video",
      url: "/dashboard/upload-video",
      icon: () => <VideotapeIcon/>,
    }
  ]
  return (
      <div style={{ display: "flex" }}>        
      <main style={{ flex: 1, padding: "1rem" }}>
         <SidebarProvider>
       <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Reimage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarItems.map((item) => (
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
      <SidebarFooter>
           <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> 
      </SidebarFooter>
    </Sidebar>
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
      </main>
    </div>
  )
}

export default DashboardContainer