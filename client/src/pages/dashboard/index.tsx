import React from "react";
import { Outlet } from "react-router";
import {
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { ImageIcon, LucideHome, VideotapeIcon } from "lucide-react";
import { useAppSelector } from "@/store/store";

type Props = {};

function DashboardContainer({}: Props) {
  const sideBarItems = [
    {
      title: "Home",
      url: "/dashboard",
      icon: () => <LucideHome />,
    },
    {
      title: "Upload Image",
      url: "/dashboard/upload-image",
      icon: () => <ImageIcon />,
    },
    {
      title: "Upload Video",
      url: "/dashboard/upload-video",
      icon: () => <VideotapeIcon />,
    },
  ];

  const user = useAppSelector((state) => state.userSlice.user);
  console.log(user);
  return (
    <div className="flex">
      <main className="flex w-full px-[1rem]">
        <SidebarProvider>
          <Sidebar collapsible="icon">
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
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground overflow-hidden"
                  >
                    {user && (
                      <div className="flex gap-2 items-center">
                        <img
                          src={user.avatar}
                          className="rounded-full size-7"
                          alt="avatar"
                        />
                        <div className="space-y-0 ">
                          <p className="leading-3 text-sm">{user.userName}</p>
                          <p className="text-gray-400 text-xs">{user.email}</p>
                        </div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main className="relative flex flex-col w-full">
            <SidebarTrigger className="absolute top-4"/>
            <Outlet />
          </main>
        </SidebarProvider>
      </main>
    </div>
  );
}

export default DashboardContainer;
