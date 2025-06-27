import React, { useEffect } from "react";
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

import { SignOutButton, useClerk } from '@clerk/clerk-react'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { BracketsIcon, ImageIcon, LucideHome, PenLineIcon, VideotapeIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiHandler } from "@/lib/apiHandler";
import { signIn } from "@/store/user.slice";
import { ThemeToggler } from "@/components/customComponents";


function DashboardContainer() {
  const { signOut, session } = useClerk()

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
    {
      title: "Remove BG",
      url: "/dashboard/remove-bg",
      icon: () => <BracketsIcon/>,
    },
    {
      title: "Sign It",
      url: "/dashboard/sign",
      icon: () => <PenLineIcon/>,
    },
  ];

  const signOutFxn = async()=>{
    try {      
    if(session){
        // setLoading(true);
        await signOut((session as any).id);}
      } catch (error) {
        toast.error("error while sign out.");
      }finally{
        // setLoading(false)
      }
    }

     const dispatch = useAppDispatch();
      useEffect(()=>{
        ;(async()=>{
          const res = await apiHandler('/auth/current-user','get');
          if(!res.success) {
            dispatch(signIn(null));
            return;}
          const dataToDispatch = {
            id:(res.res as any).data.data.id,
            userName: (res.res as any).data.data.username,
            email: (res.res as any).data.data.emailAddresses[0].emailAddress,
            avatar:(res.res as any).data.data.imageUrl
          }
          dispatch(signIn(dataToDispatch));
        })();
      },[])
  

  const user = useAppSelector((state) => state.userSlice.user);
  console.log(user);
  return (
    <div className="flex">
      <main className="flex w-full ">
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
                      <div className="flex gap-1 items-center">
                        <img
                          src={user.avatar}
                          className="rounded-full size-7"
                          alt="avatar"
                        />
                        <div className="space-y-0">
                          <p className="leading-3 text-sm">{user.userName}</p>
                          <p className="text-gray-400 text-[10px]">{user.email}</p>
                        </div>
                        {/* <div className="bg-red-900 px-4 py-2 text-nowrap rounded-md text-xs cursor-help">
                          <SignOutButton/>
                        </div> */}
                        <Button variant='destructive' className="text-xs" onClick={ signOutFxn }>
                          Sign out
                        </Button>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main className="relative flex flex-col w-full ">
            <ThemeToggler className="absolute right-4 top-4"/>
            <SidebarTrigger className="fixed top-4"/>
            <Outlet />
          </main>
        </SidebarProvider>
      </main>
    </div>
  );
}

export default DashboardContainer;
