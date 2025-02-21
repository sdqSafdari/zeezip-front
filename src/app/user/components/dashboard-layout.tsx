"use client"

import type { ReactNode } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { FileText, Home, Settings, Upload, User } from "lucide-react"
import Header from "./header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfoDto from "@/app/user/UserInfoDto";

export default function DashboardLayout({ children, userInfo }: { children: ReactNode,userInfo:UserInfoDto }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <Sidebar>
                    <SidebarHeader>
                        <h2 className="px-4 text-lg font-semibold">CloudStore</h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard">
                                        <Home className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/files">
                                        <FileText className="mr-2 h-4 w-4" />
                                        My Files
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/upload">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/account">
                                        <User className="mr-2 h-4 w-4" />
                                        Account
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="flex items-center px-4 py-2">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="" alt={userInfo.avatarFallbackName()} />
                                <AvatarFallback>{userInfo.avatarFallbackName()}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{userInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <div className="flex flex-1 flex-col overflow-hidden w-full">
                    <Header userInfo={userInfo}/>
                    <main className="flex-1 overflow-y-auto bg-background">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}

